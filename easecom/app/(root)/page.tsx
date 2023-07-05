import {Button} from "@/components/ui/button";
import {UserButton} from "@clerk/nextjs";

const SetupPage = () => {
    return (
        <div className={"p-4"}>
            <UserButton afterSignOutUrl="/"/>
            <p>This Is A Private Route</p>
            <Button>HATT! BC</Button>
        </div>
    );
}

export default SetupPage;
