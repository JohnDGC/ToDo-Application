
export class Components {

  async setRootComponent(selector: string, template: string): Promise<any> {
    let htmlNode: HTMLElement = document.getElementById(selector);
    let response = await fetch(`/src/app/ui/todoWeb/${template}.html`);
    let htmlResponse = await response.text();
    htmlNode.innerHTML = htmlResponse;
  }

  async setViewComponent(selector: string, template: string): Promise<any> {
    let htmlNode: HTMLElement = document.querySelector(selector);
    let response = await fetch(`/src/app/ui/todoWeb/components/${template}.html`);
    let htmlResponse = await response.text();
    return htmlNode.innerHTML = htmlResponse;
  }
  // async function getResponse() {
  //   const response = await fetch('/src/app/ui/todoWeb/index.html');
  //   const info = await response.text();
  //   return htmlNode.innerHTML = info;
  // }
  // getResponse();

  // setNavbar(selector: string, navbar: string): void {
  //   let htmlNode: HTMLElement = document.getElementById(selector);
  //   fetch(`/src/app/ui/todoWeb/components/${navbar}.html`)
  //     .then(res => { return res.text() })
  //     .then(html => {
  //       console.log(html);
  //       htmlNode.innerHTML = html
  //     }
  //     )
  // }

  // setTest(selector: string, test: string): void {
  //   let htmlNode: HTMLElement = document.getElementById(selector);
  //   fetch(`/src/app/ui/todoWeb/components/${test}.html`)
  //     .then(res => { return res.text() })
  //     .then(html => {
  //       console.log(html);
  //       htmlNode.innerHTML = html
  //     }
  //     )
  // }
}

