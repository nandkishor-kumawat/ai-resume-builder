"use server"

import { revalidatePath } from "next/cache";
import { hash, verify } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { auth, createSession, invalidateSession } from "@/lib/auth";
import { redirect } from "next/navigation";


export const signIn = async (email: string, password: string) => {

    if (!email || !password) {
        return {
            error: 'All fields are required'
        }
    }

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (user && !user.password) {
        return {
            error: 'This account was created with Google, please sign in with Google'
        }
    }

    if (!user) {
        return {
            error: 'Invalid credentials'
        }
    }

    const passwordValid = await verify(user.password!, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    if (!passwordValid) {
        return {
            error: 'Invalid credentials'
        }
    }

    await createSession(user.id);
    revalidatePath('/', 'layout');
    return {
        user
    }
}

export const signUp = async (name: string, email: string, password: string) => {

    if (!email || !password || !name) {
        return {
            error: 'All fields are required'
        }
    }

    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    })

    try {
        const existingUser = await prisma.user.findFirst({
            where: { email }
        })
        if (existingUser) {
            return { error: 'User already exists' }
        }

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: passwordHash,
            }
        })
        await createSession(user.id);
        revalidatePath('/', 'layout')
        return { user }
    } catch (error) {
        console.log(error)
        return { error: 'Error creating user' }
    }
}

export const signOut = async () => {
    const { session } = await auth();
    if (!session) return;
    await invalidateSession(session.id);
    revalidatePath('/', 'layout');
    redirect('/sign-in');
}