import React from 'react'
import '../sass-files/Typography.scss'

export default function Typography() {
  return (
    <section className="component typography">
        <div className="container">
            <p className="headers title">This is a title header in a p tag</p>
            <p className="headers h1">This is a h1 header in a p tag</p>
            <p className="headers h2">This is a h2 header in a p tag</p>
            <p className="headers h3">This is a h3 header in a p tag</p>
            <p className="headers h4">This is a h4 header in a p tag</p>
            <p className="headers h5">This is a h5 header in a p tag</p>
            <p className="base-text">This is some base text at 16px/1rem. This should be in a paragraph. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis facilis eveniet repellat consequuntur ipsam porro maiores nesciunt distinctio nisi? Cupiditate officiis maiores qui officia maxime numquam. Impedit unde quaerat doloremque?</p>
            <p className="base-text caption">This is some captions. This should be in a caption only, not a paragraph.</p>
            <p className="base-text smaller-caption">This is honestly some really small captions. This should be in a caption only, not a paragraph.</p>
        </div>
     </section>
  )
}
