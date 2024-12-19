import {
  getRandomNumber,
  getPrevIndex,
  getNextIndex,
  hasPreselect,
} from '../utils'
import { isOpenKey, isTypingLetters } from '../utils/keyboard'
import { type Option } from '../types'

const customSelectStyles = `
  :host {
    --list-background: white;
	  --min-width: initial;
  }

  * {
    box-sizing: border-box;
  }

  .select-wrapper {
    position: relative;
  }
  
  .combobox {
    align-items: center;
    background-color: var(--list-background, white);
    border: 1px solid rgb(0 0 0 / 30%);
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    min-height: 20px;
    min-width: var(--min-width);
    padding: 4px 22px 4px 4px;
    position: relative;
  }

  .combobox:hover {
    border-color: rgb(0, 0, 0);

  }

  .combobox:focus {
    outline: 2px solid rgb(105 185 245 / 80%);
    outline-offest: -1px;
  }

  .combobox:focus:hover {
    outline-color: rgb(105 185 245);
  }
  
  .combobox:after {
  	content: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.53516 12.2148L2.28516 6.96484C2.01172 6.71875 2.01172 6.30859 2.28516 6.03516C2.53125 5.78906 2.94141 5.78906 3.21484 6.03516L8 10.8477L12.7852 6.0625C13.0312 5.78906 13.4414 5.78906 13.7148 6.0625C13.9609 6.30859 13.9609 6.71875 13.7148 6.96484L8.4375 12.2148C8.19141 12.4883 7.78125 12.4883 7.53516 12.2148Z' fill='black'/%3E%3C/svg%3E%0A");
    height: 16px;
    position: absolute;
    right: 3px;
    width: 16px;
  }
  
  .option-list {
    background-color: var(--list-background, white);
    border: 1px solid rgba(49 52 66 / 35%);
    border-radius: 5px; 
    cursor: pointer;  
    display: none;
    flex-direction: column;
    max-width: 400px;
    position: absolute;
    top: calc(100% + 2px); 
  }
  
  .option-list.open {
    display: flex;
  }
  
  .option {
    align-items: center;
    border-top: 1px solid rgba(49 52 66 / 10%);
    display: flex;
    justify-content: flex-start;
    min-height: 24px;
	  min-width: var(--min-width);
    padding: 3px 8px 3px 25px;
    position: relative;
  }
  
  .option.preselected {
    background-color: rgb(105 185 245 / 25%);
  }
  
  .option:first-child {
  	border-top: none;
  }
  
  .option.selected::before {
  	content: url("data:image/svg+xml,%3Csvg width='12' height='9' viewBox='0 0 12 9' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='path-1-outside-1_710_6274' maskUnits='userSpaceOnUse' x='0' y='0' width='12' height='9' fill='black'%3E%3Crect fill='black' width='12' height='9'/%3E%3Cpath d='M11.0156 0.984375C11.3203 1.26562 11.3203 1.75781 11.0156 2.03906L5.01562 8.03906C4.73438 8.34375 4.24219 8.34375 3.96094 8.03906L0.960938 5.03906C0.65625 4.75781 0.65625 4.26562 0.960938 3.98438C1.24219 3.67969 1.73438 3.67969 2.01562 3.98438L4.5 6.44531L9.96094 0.984375C10.2422 0.679688 10.7344 0.679688 11.0156 0.984375Z'/%3E%3C/mask%3E%3Cpath d='M11.0156 0.984375C11.3203 1.26562 11.3203 1.75781 11.0156 2.03906L5.01562 8.03906C4.73438 8.34375 4.24219 8.34375 3.96094 8.03906L0.960938 5.03906C0.65625 4.75781 0.65625 4.26562 0.960938 3.98438C1.24219 3.67969 1.73438 3.67969 2.01562 3.98438L4.5 6.44531L9.96094 0.984375C10.2422 0.679688 10.7344 0.679688 11.0156 0.984375Z' fill='black'/%3E%3Cpath d='M11.0156 0.984375L10.8687 1.12003L10.8741 1.12591L10.88 1.13134L11.0156 0.984375ZM11.0156 2.03906L10.8799 1.89198L10.8742 1.89764L11.0156 2.03906ZM5.01562 8.03906L4.87409 7.89753L4.86866 7.90341L5.01562 8.03906ZM3.96094 8.03906L4.10802 7.9033L4.10236 7.89764L3.96094 8.03906ZM0.960938 5.03906L1.10247 4.89753L1.09659 4.8921L0.960938 5.03906ZM0.960938 3.98438L1.09659 4.13134L1.10247 4.12591L1.1079 4.12003L0.960938 3.98438ZM2.01562 3.98438L1.86852 4.12017L1.87488 4.12646L2.01562 3.98438ZM4.5 6.44531L4.35925 6.5874L4.50067 6.72749L4.64142 6.58673L4.5 6.44531ZM9.96094 0.984375L10.1025 1.12591L10.1079 1.12003L9.96094 0.984375ZM10.88 1.13134C11.0989 1.33339 11.0989 1.69004 10.88 1.8921L11.1513 2.18602C11.5418 1.82558 11.5418 1.19786 11.1513 0.837414L10.88 1.13134ZM10.8742 1.89764L4.8742 7.89764L5.15705 8.18048L11.157 2.18048L10.8742 1.89764ZM4.86866 7.90341C4.66661 8.1223 4.30996 8.1223 4.1079 7.90341L3.81398 8.17472C4.17442 8.5652 4.80214 8.5652 5.16259 8.17472L4.86866 7.90341ZM4.10236 7.89764L1.10236 4.89764L0.819516 5.18048L3.81952 8.18048L4.10236 7.89764ZM1.09659 4.8921C0.877698 4.69004 0.877698 4.33339 1.09659 4.13134L0.825282 3.83741C0.434802 4.19786 0.434802 4.82558 0.825282 5.18602L1.09659 4.8921ZM1.1079 4.12003C1.30996 3.90114 1.66661 3.90114 1.86866 4.12003L2.16259 3.84872C1.80214 3.45824 1.17442 3.45824 0.813977 3.84872L1.1079 4.12003ZM1.87488 4.12646L4.35925 6.5874L4.64075 6.30322L2.15637 3.84229L1.87488 4.12646ZM4.64142 6.58673L10.1024 1.1258L9.81952 0.842954L4.35858 6.30389L4.64142 6.58673ZM10.1079 1.12003C10.31 0.901135 10.6666 0.901135 10.8687 1.12003L11.1626 0.848719C10.8021 0.45824 10.1744 0.45824 9.81398 0.848719L10.1079 1.12003Z' fill='black' mask='url(%23path-1-outside-1_710_6274)'/%3E%3C/svg%3E%0A");
    left: 4px;
    position: absolute;
    top: 7.5px;
  }
`

export class SelectUpgrade extends HTMLElement {
  static observedAttributes = ['value', 'label']

  label: string | undefined = undefined
  value: string | undefined = undefined

  #options: Option[] = []
  #preselectIndex: number | null = null

  #optionsListEl?: HTMLDivElement
  #stylesEl?: HTMLStyleElement
  #shadowRoot?: ShadowRoot
  #comboboxEl?: HTMLDivElement
  #wrapperEl?: HTMLDivElement
  #labelEl?: HTMLDivElement

  get #selectEl(): HTMLSelectElement {
    return this.querySelector('select') as HTMLSelectElement
  }
  get #selectedOption(): HTMLDivElement | null {
    return this.querySelector('.option.selected')
  }
  get #isOpen(): boolean {
    return this.#optionsListEl!.classList.contains('open')
  }

  constructor() {
    super()
    this.#setup()
  }

  #setup(): void {
    const optionListId = `option-list-${getRandomNumber()}`

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.addStyles(customSelectStyles)

    this.#wrapperEl = document.createElement('div')
    this.#wrapperEl.classList.add('select-wrapper')

    this.#comboboxEl = document.createElement('div')
    this.#comboboxEl.classList.add('combobox')
    this.#comboboxEl.textContent = this.#selectedOption?.textContent || ''
    this.#comboboxEl.tabIndex = 0
    this.#comboboxEl.role = 'combobox'
    this.#comboboxEl.setAttribute('aria-controls', optionListId)
    this.#comboboxEl.setAttribute('aria-expanded', 'false')

    this.#optionsListEl = document.createElement('div')
    this.#optionsListEl.id = optionListId
    this.#optionsListEl.classList.add('option-list')
    this.#optionsListEl.role = 'listbox'

    if (!!this.label) {
      const labelId = `combobox-label-${getRandomNumber()}`
      this.#labelEl = document.createElement('div')
      this.#labelEl.id = labelId
      this.#labelEl.textContent = this.label
      this.#comboboxEl.setAttribute('aria-labelledby', labelId)
      this.#wrapperEl.appendChild(this.#labelEl)
    }

    this.#wrapperEl.appendChild(this.#comboboxEl)
    this.#wrapperEl?.appendChild(this.#optionsListEl)
    this.#shadowRoot.appendChild(this.#wrapperEl)
  }

  // PUBLIC METHODS

  onOptionSelected = (option: Option): void => {}
  customizeOption = (
    option: HTMLDivElement,
    original: HTMLOptionElement
  ): HTMLDivElement => option

  addStyles = (newStyles: string): void => {
    if (!this.#stylesEl) {
      this.#stylesEl = document.createElement('style')
      this.#shadowRoot!.appendChild(this.#stylesEl)
    }

    this.#stylesEl.textContent =
      this.#stylesEl.textContent?.concat(newStyles) || ''
  }

  // PRIVATE METHODS

  #preselectOption = (preselectOption: Option | null | undefined): void => {
    //reset the preselect
    this.#preselectIndex = null
    this.#comboboxEl!.removeAttribute('aria-activedescendant')

    this.#options.forEach((option, currentIndex): void => {
      if (option.custom === preselectOption?.custom) {
        option.custom.classList.add('preselected')
        this.#comboboxEl!.setAttribute(
          'aria-activedescendant',
          option.custom.id
        )
        this.#preselectIndex = currentIndex
      } else {
        option.custom.classList.remove('preselected')
      }
    })
  }

  #preselectByIndex = (index: number): void => {
    const optionToSelect = this.#options?.[index]
    this.#preselectOption(optionToSelect)
  }

  #preselectNext = () => {
    const index = getNextIndex(this.#preselectIndex, this.#options)
    this.#preselectByIndex(index)
  }

  #preselectPrev = () => {
    const index = getPrevIndex(this.#preselectIndex, this.#options)
    this.#preselectByIndex(index)
  }

  #preselectPageUp = (): void => {
    if (!this.#preselectIndex) this.#preselectByIndex(0)

    const updatedIndex = Math.max(0, this.#preselectIndex! - 10)
    this.#preselectByIndex(updatedIndex)
  }

  #preselectPageDown = (): void => {
    const startingIndex: number = this.#preselectIndex || 0

    const updatedIndex = Math.min(startingIndex + 10, this.#options.length - 1)

    this.#preselectByIndex(updatedIndex)
  }

  #open(): void {
    document.addEventListener('click', this.#clickAway)
    this.#optionsListEl!.classList.add('open')
    this.#preselectOption(null)
  }

  #close(): void {
    document.removeEventListener('click', this.#clickAway)
    this.#preselectOption(null)
    this.#optionsListEl!.classList.remove('open')
  }

  #toggleOpen = (): void => {
    this.#isOpen ? this.#close() : this.#open()
  }

  #setValue = (value: string): void => {
    if (this.#selectEl) {
      this.#selectEl.value = value
      this.#selectEl.dispatchEvent(new Event('change'))
      this.setAttribute('value', value)
    }
  }

  #handleKeydown = (event: KeyboardEvent): void => {
    // Allow focus and blur to handle Tab
    if (event.key === 'tab') return

    if (this.#isOpen) {
      this.#handleOpenKeyboardEvents(event)
    } else {
      this.#handleClosedKeyboardEvents(event)
    }
  }

  #handleOpenKeyboardEvents(event: KeyboardEvent): void {
    const { key, altKey } = event

    if (isTypingLetters(event)) {
      console.log('Typing on open select')
    }

    switch (key) {
      case 'Escape':
        this.#close()
        break
      case 'ArrowUp':
        altKey ? this.#handleSubmit() : this.#preselectPrev()
        break
      case 'ArrowDown':
        this.#preselectNext()
        break
      case 'PageUp':
        this.#preselectPageUp()
        break
      case 'PageDown':
        this.#preselectPageDown()
        break
      case 'Home':
        this.#preselectByIndex(0)
        break
      case 'End':
        this.#preselectByIndex(this.#options.length - 1)
        break
      case 'Enter':
      case ' ':
        this.#handleSubmit()
    }
  }

  #handleClosedKeyboardEvents(event: KeyboardEvent): void {
    const { key } = event

    if (isTypingLetters(event)) {
      console.log('Typing on closed select!')
    }

    if (isOpenKey(key)) {
      this.#open()
    }
  }

  #handleSubmit = (): void => {
    if (hasPreselect(this.#preselectIndex)) {
      const option = this.#options[this.#preselectIndex!]!.original
      this.#setValue(option!.value)
    } else {
      this.#close()
    }
  }

  #clickAway = (event: MouseEvent): void => {
    if (this.#isOpen && event.target !== this) {
      this.#close()
    }
  }

  #buildCustomOptionElement = (original: HTMLOptionElement): HTMLDivElement => {
    const option = document.createElement('div')
    option.classList.add('option')
    option.id = `option=${getRandomNumber()}`
    option.role = 'option'
    option.textContent = original.textContent
    option.setAttribute('value', original.value)
    option.addEventListener('click', (event: Event): void => {
      this.#setValue(original.getAttribute('value') || '')
    })
    option.addEventListener('mouseenter', (event: MouseEvent): void => {
      console.log('mouseenter')
      this.#preselectOption({ custom: option, original })
    })

    return this.customizeOption(option, original)
  }

  #buildOptionList = () => {
    this.#selectEl!.childNodes.forEach((original): void => {
      if (original instanceof HTMLOptionElement) {
        const custom = this.#buildCustomOptionElement(original)

        if (original.selected) {
          this.#selectOption(custom)
        }

        this.#optionsListEl!.appendChild(custom)
        this.#options.push({ custom, original })
      }
    })
  }

  #selectOption = (option: HTMLDivElement): void => {
    option.classList.add('selected')
    option.setAttribute('aria-selected', 'true')
    this.setAttribute('value', option.getAttribute('value') || '')
    this.#comboboxEl!.innerHTML = option.innerHTML
  }

  #unselectOption = (option: HTMLDivElement): void => {
    option.classList.remove('selected')
    option.removeAttribute('aria-selected')
  }

  #setMinimumWidth = (): void => {
    const hostStyles = window.getComputedStyle(this.#shadowRoot!.host)
    if (!hostStyles.getPropertyValue('--min-width')) {
      this.#optionsListEl!.style.visibility = 'hidden'
      this.#optionsListEl!.classList.add('open')
      const minWidth = this.#optionsListEl!.clientWidth + 'px'
      this.style.setProperty('--min-width', minWidth)
      this.#optionsListEl!.classList.remove('open')
      this.#optionsListEl!.style.visibility = 'visible'
    }
  }

  // LIFECYLE EVENTS

  connectedCallback(): void {
    this.#buildOptionList()
    this.#comboboxEl!.addEventListener('click', this.#toggleOpen)
    this.#comboboxEl!.addEventListener('keydown', this.#handleKeydown)

    this.childNodes.forEach((childNode): void => {
      if (childNode instanceof HTMLSelectElement) {
        childNode.addEventListener('change', (event: Event): void => {
          this.setAttribute('value', (event.target as HTMLSelectElement).value)
          if (this.#isOpen) {
            this.#toggleOpen()
          }
        })
      }
    })

    this.addEventListener('blur', (event: FocusEvent): void => {
      if (this.#isOpen) {
        this.#handleSubmit()
      }
    })

    this.#setMinimumWidth()
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === 'value') {
      this.#options.forEach((option): void => {
        if (option.original.getAttribute('value') === newValue) {
          this.#selectOption(option.custom)
          this.onOptionSelected(option)
        } else {
          this.#unselectOption(option.custom)
        }
      })
    }
  }
}

customElements.define('select-upgrade', SelectUpgrade)
