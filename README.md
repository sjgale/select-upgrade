# Select-Upgrade: A custom select component

This project is a custom web component for creating a fully customizable select dropdowns.

## Features

- Customizable styles
- Easy to integrate and extend
- Lightweight and fast

## Installation

To preview:

```bash
yarn install
yarn dev
```

## Simple Usage

Ready to jazz up your project? Just import this nifty component and wrap it around a simple select for a fully styleable upgrade.

```html
<script type="module" src="path/to/custom-select.js"></script>

<select-wc>
  <select name="pets" onchange="event => alert(event.target.value)">
    <option value="blue">Dog</option>
    <option value="">Cat</option>
    <option value="3">Goldfish</option>
  </select>
</select-wc>
```

## A more complex example

But still pretty simple!

Example with some custom styles and additional content:

In `photo-select.js`

```ts
import { CustomSelect } from './custom-select'

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
```

```html
<script type="module" src="path/to/photo-select.js"></script>

<photo-select>
  <select name="options" onchange="event => alert(event.target.value)">
    <option value="first" data-thumb="https://picsum.photos/seed/first/200">
      First option
    </option>
    <option value="second" data-thumb="https://picsum.photos/seed/second/200">
      Second option
    </option>
    <option value="third" data-thumb="https://picsum.photos/seed/third/200" selected>
      Third Option
    </option>
    <option value="fourth" data-thumb="https://picsum.photos/seed/fourth/200">
      Fourth Option
    </option>
  </select>
</photo-select>
```

## To-Do List

- [ ] Type ahead key handlers
- [ ] Dynamic positioning based on scroll position
- [ ] Add additional customization hooks
  - [ ] Customizing the combobox appearance
  - [ ] Support for an included, and customizable label

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.