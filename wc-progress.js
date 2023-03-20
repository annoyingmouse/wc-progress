class WCProgress extends HTMLElement {

  static get observedAttributes() {
    return [
      'progress',
      'start',
      'middle',
      'end',
      'height',
    ]
  }
  
  sanitiseHex(hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1)
    }
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    if (hex.length !== 6) {
      throw new Error('Invalid colour.')
    }
    return `#${hex}`
  }

  get css() {
    return `
      .progress {
        width: 100%;
        height: ${this.height}px;
        border: 1px solid #888888;
        background: #DDDDDD;
        position: relative;
      }
      .bar {
        position: absolute;
        width: ${this.progress}%;
        height: 100%;
        background-color: ${this.progress < 50
          ? this.mixColour(this.start, this.middle, (this.progress / 50))
          : this.mixColour(this.middle, this.end, ((this.progress - 50) / 50))};
      }
    `
  }

  get html() {
    return `
      <div class="progress">
        <div class="bar"/>
      </div>
    `
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  hexToRGB = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`).substring(1).match(/.{2}/g).map(x => parseInt(x, 16))
  
  mixColour = (c1, c2, pc) => this.RGBToHex(Math.round(this.mix(c1[0], c2[0], pc)), Math.round(this.mix(c1[1], c2[1], pc)), Math.round(this.mix(c1[2], c2[2], pc)))
  
  RGBToHex = (r, g, b) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  
  mix = (s, e, pc) => s + ((pc) * (e - s))

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this.render()
    } else {
      if (oldValue !== newValue) {
        this.render()
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${this.css}
      </style>
      ${this.html}
    `
  }

  get progress() {
    return Number(this.getAttribute('progress')) || 0
  }
  get height() {
    return Number(this.getAttribute('height')) || 20
  }
    
  get start() {
    return this.getAttribute('start') 
      ? this.hexToRGB(this.sanitiseHex(this.getAttribute('start')))
      : this.hexToRGB('#FF0000')
  }
  get middle() {
    return this.getAttribute('middle') 
      ? this.hexToRGB(this.sanitiseHex(this.getAttribute('middle')))
      : this.hexToRGB('#FF9900')
  }
  get end() {
    return this.getAttribute('end') 
      ? this.hexToRGB(this.sanitiseHex(this.getAttribute('end')))
      : this.hexToRGB('#33FF00')
  }

}
window.customElements.define('wc-progress', WCProgress)