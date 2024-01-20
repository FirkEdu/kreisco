import { redirect } from "next/navigation"

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import { updateProfile } from "@/lib/update-profile";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        await updateProfile()
        return redirect(`/servers/${server.id}`);
    }

    return <InitialModal />
}
 
export default SetupPage;