import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const updateProfile = async () => {
    const user = await currentUser()

    if(!user) {
        return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        }
    })

    if(!profile) {
        return redirectToSignIn();
    }

    const updatedProfile = await db.profile.update({
        where:{
          userId:user.id
          },
          data: {
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
          }
        });

    return updatedProfile;
}