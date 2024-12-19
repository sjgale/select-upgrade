import { CustomSelect } from './select-upgrade'

const photoSelectStyles = `
  * {
    font-family: sans-serif;
  }

  :host {
    --min-width: 300px;
  }

  .option {
    padding: 5px 5px 5px 30px;
  }

  .option.selected::before {
    left: 5px;
    top: 19px;
  }

  .thumb {
    background-color: var(--swatch-color, white);
    height: 50px;
    margin-right: 10px;
    width: 50px;
  }
`

class PhotoSelect extends CustomSelect {
  constructor() {
    super()

    this.addStyles(photoSelectStyles)
  }

  customizeOption = (option: HTMLDivElement, original: HTMLOptionElement) => {
    const thumb = document.createElement('img')
    thumb.classList.add('thumb')
    thumb.src = original.dataset.thumb || ''
    option.prepend(thumb)

    return option
  }
}

customElements.define('photo-select', PhotoSelect)
