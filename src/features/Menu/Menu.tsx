import { HeadMenuItem } from "@/features/Menu/components/HeadMenuItem"
import "./Menu.scss"

export const Menu = () : JSX.Element => {
    return (
        <div className="menu">
            <HeadMenuItem title="The Fellowship of the Ring"/>
            <HeadMenuItem title="The Two Towers"/>
            <HeadMenuItem title="The Return of The King"/>
        </div>
    )
}
