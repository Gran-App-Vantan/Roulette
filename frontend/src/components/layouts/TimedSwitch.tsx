import { useTimedSwitch } from "@/hooks/useTimedSwitch";
import { Standby} from "@/components/elements/Standby";
import { LeftMenu } from "../elements/LeftMenu";

export default function TimedSwitch() {
    const { showA, bActive } = useTimedSwitch(180000);
    return (
        <div>
            {showA && <Standby  duration={180}/>}
            <LeftMenu isActive={bActive} />
        </div>
    );
}