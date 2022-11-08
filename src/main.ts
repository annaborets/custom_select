const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = `
<style>
.selected {
 display: block; 
 cursor:pointer;
 font-size: 20px; 
 color: #444; 
 line-height: 1.3; 
 padding: 0.6em 1.4em 0.5em 1.5em;
 width: 100%; 
 max-width: 100%; 
 box-sizing: border-box; 
 margin: 0; 
 border: 1px solid #aaa;
 box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04); 
 border-radius: 0.5em;
 background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
 background-repeat: no-repeat, repeat;
 background-position: right 0.7em top 0.9em, 0 0;
 background-size: 0.65em auto, 100%;
 outline-color: #B7D4FE;
 outline-style: solid;
 outline-width:0.1px;
 transition: outline-width 1s linear;
}

.selected:hover {
  outline-width: 5px;
}

.list {
 position:relative;
 background-color:white;
 list-style:none;
 font-size:18px;
 margin:0;
 padding:0;
 border: 0.5px solid black;
 box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

::slotted(*) {
  padding:0.2em 1.4em 0.2em 1.5em;
}

::slotted(li:hover) {
  background-color:#1E90FF;
  cursor:pointer;
}

.closed ul {
  display: none;
}
</style>
<div class="select closed">
 <div class="selected"></div>
 <ul class="list">
  <slot name="item"></slot>
 </ul>
</div>
`;

export class SelectComponent extends HTMLElement {
  private wrapper: HTMLDivElement;
  private selected: HTMLDivElement;
  private slotNodes: Node[];
  private list: HTMLElement;
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    if (!this.shadowRoot) {
      throw new Error("Shadow root is not open");
    }

    this.wrapper = this.shadowRoot.querySelector(".select") as HTMLDivElement;

    this.list = this.shadowRoot.querySelector(".list") as HTMLElement;

    this.slotNodes = (
      this.shadowRoot.querySelector("slot") as HTMLSlotElement
    ).assignedNodes();

    this.selected = this.shadowRoot.querySelector(
      ".selected"
    ) as HTMLDivElement;
  }

  connectedCallback() {
    this.selected.innerText = (this.slotNodes[0] as HTMLLIElement).innerText;

    this.selected.onclick = () => {
      this.wrapper.classList.toggle("closed");
    };

    this.list.onclick = (e) => {
      this.selected.innerText = (e.target as HTMLElement).innerText;
      this.wrapper.classList.add("closed");
    };
  }
}

customElements.define("select-component", SelectComponent);
