import { type Option } from '../types'
import { SelectUpgrade } from './select-upgrade'

const colorSelectStyles = `
  * {
    font-family: sans-serif;
  }

  .swatch {
    background-color: var(--swatch-color, white);
    height: 10px;
    margin-right: 5px;
    width: 10px;
  }
`

class ColorSelect extends SelectUpgrade {
  constructor() {
    super()

    this.onOptionSelected({
      original: this.querySelector('option[selected]') as HTMLOptionElement,
      custom: document.createElement('div'),
    })

    this.addStyles(colorSelectStyles)
  }

  customizeOption = (option: HTMLDivElement, original: HTMLOptionElement) => {
    const swatch = document.createElement('div')
    swatch.classList.add('swatch')
    swatch.style.backgroundColor = original.value
    option.prepend(swatch)

    return option
  }

  onOptionSelected = (option: Option): void => {
    this.style.setProperty(
      '--list-background',
      option.original.dataset.bgColor || ''
    )
  }
}

customElements.define('color-select', ColorSelect)
