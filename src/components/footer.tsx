import { ClassComponent, vdom } from "simple-tsx-vdom";
import "./footer.scss";

interface Props
{
}

export class Footer extends ClassComponent<Props>
{
    public render()
    {
        return <footer class='footer container'>
            Alan Lawrey 2023
        </footer>
    }
}