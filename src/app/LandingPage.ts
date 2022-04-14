import { Group } from "three";
import { Title } from "./Title";
import { Text } from "./Typography/Text";

export class LandingPage extends Group {
  title: Title;
  constructor() {
    super();

    this.title = new Title("My Journey");
    this.add(this.title);
    this.title.position.set(-53, 20, 0);

    const text = new Text();
    this.add(text);
  }
}
