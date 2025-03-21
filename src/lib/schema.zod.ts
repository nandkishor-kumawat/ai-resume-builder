import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
    title: optionalString,
    description: optionalString,
    fieldsOrder: z.array(z.string()),
    margins: z.object({
        top: z.number().default(40),
        bottom: z.number().default(40),
        left: z.number().default(40),
        right: z.number().default(40),
        unit: z.enum(["px", "mm", "cm"]).default("px"),
    })
});
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
    firstName: optionalString,
    lastName: optionalString,
    jobTitle: optionalString,
    city: optionalString,
    country: optionalString,
    phone: optionalString,
    email: optionalString,
});
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;


export const workExperienceSchema = z.object({
    workExperiences: z
        .array(
            z.object({
                position: optionalString,
                company: optionalString,
                startDate: optionalString,
                endDate: optionalString,
                description: optionalString,
            }),
        )
        .optional(),
});
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export const educationSchema = z.object({
    educations: z
        .array(
            z.object({
                school: optionalString,
                degree: optionalString,
                startDate: optionalString,
                endDate: optionalString,
            }),
        )
        .optional(),
});
export type EducationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
    skills: z.array(z.object({
        skill: optionalString,
        level: optionalString,
    })).optional(),
});
export type SkillsValues = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
    summary: optionalString,
});
export type SummaryValues = z.infer<typeof summarySchema>;

export const projectSchema = z.object({
    projects: z
        .array(
            z.object({
                title: optionalString,
                startDate: optionalString,
                endDate: optionalString,
                description: optionalString,
                link: optionalString,
            }),
        )
        .optional(),
});
export type ProjectValues = z.infer<typeof projectSchema>;

const customFieldSchema = z.object({
    title: optionalString,
    startDate: optionalString,
    endDate: optionalString,
    description: optionalString,
});

export const customSectionSchema = z.object({
    customSections: z.array(z.object({
        title: z.string(),
        items: z.array(customFieldSchema),
    })),
})

export type CustomSectionValues = z.infer<typeof customSectionSchema>;


export const resumeSchema = z.object({
    ...generalInfoSchema.shape,
    ...personalInfoSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...summarySchema.shape,
    ...projectSchema.shape,
    ...customSectionSchema.shape
});

export type ResumeValues = z.infer<typeof resumeSchema> & {
    id?: string;
};