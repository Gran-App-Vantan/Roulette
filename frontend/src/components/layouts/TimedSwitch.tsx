import { useTimedSwitch } from "@/hooks/useTimedSwitch";
import { Standby} from "@/components/elements/Standby";
import { LeftMenu } from "../elements/LeftMenu";

export default function TimedSwitch() {
    const { showA, bActive } = useTimedSwitch(30000);
    return (
        <div>
            {showA && <Standby duration={30}/>}
            <LeftMenu isActive={bActive} />
        </div>
    );
}