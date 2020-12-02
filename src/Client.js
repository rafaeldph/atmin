import React from 'react';

class Client extends React.Component {
  constructor(props) {
    super(props);

    let skins = ["#c58c85","#ecbcb4","#d1a3a4","#a1665e","#503335","#592f2a"];
    this.skin = skins[parseInt(Math.random() * skins.length)];

    let hairs = ["#76412a","#97502d","#d08736","#b87b36","#714628","#e6be8a","#5e321f","#ffcc47","#996515","#7c0a02","#5d1916","#121212","#310306","#59260b","#aa8866","#debe99","#241c11","#4f1a00","#9a3300"];
    this.hair = hairs[parseInt(Math.random() * hairs.length)];

    this.gender = Math.round(Math.random());
    
    this.shoes = `rgb(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)})`;
    this.pants = `rgb(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)})`;
    this.shirt = `rgb(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)})`;
  }

  render() {
    if (this.gender) {
      return (
        <svg viewBox="0 0 46.05 71.36">
          <g>
            <path fill={this.shoes} d="M25.33,12.54s-.91-6.26,0-9.54,2.5-4.47,4.66-.45,0,10.62,0,10.62Z" />
            <path fill={this.pants} d="M34.15,24.32l-1.56-9.93-1-6.17S26.4,4.14,25,9.43s-.33,8.24-.33,8.24l-2.46,6.54Z" />
            <path fill={this.shoes} d="M20.61,12.54s.91-6.26,0-9.54S18.11-1.47,16,2.55s0,10.62,0,10.62Z" />
            <path fill={this.pants} d="M10.18,23.79l3.17-9.4,1-6.17s5.2-4.08,6.58,1.21.34,8.24.34,8.24l1,6.54Z" />
            <path fill={this.shirt} d="M10.18,23.79a58.53,58.53,0,0,1,6.25-1.2c1.84-.05,5.44,1,7.28,1.26,2.76.33,11.07-.52,11.07-.52l3,9.57,2,17.42H6L7.72,34.23Z" />
            <path fill={this.shirt} d="M22.69,48.94c-11,0-18.76-3.53-22.69-8.53,0,3.31.23,4.08.23,5.9,0,7.57,11.81,13.2,22.46,13,11.09-.25,23.36-6.14,23.36-13.7,0-1.83-.22-3.35-.22-5.17C41.9,45.41,33.72,48.94,22.69,48.94Z" />
            <path fill={this.shirt} d="M13.68,52.85c0-5.22,9.24-15.24,9.24-15.24s9.25,10,9.25,15.24S28,59.28,22.92,59.28,13.68,58.06,13.68,52.85Z" />
            <path fill={this.skin} d="M12.05,56.35c0-3.75,2.06-6.16,4.14-9.34,1.74-2.65,3.85-4.78,6.72-4.78s4.74,2,6.45,4.4c2.23,3.2,4.42,5.82,4.42,9.72,0,6.88-4.56,12.46-10.87,12.46S12.05,63.23,12.05,56.35Z" />
            <path fill={this.skin} d="M11.18,54.29c.32-1.41,1.11-2.44,1.76-2.29s.93,1.42.6,2.83-1.1,2.44-1.76,2.29S10.86,55.71,11.18,54.29Z" />
            <path fill={this.skin} d="M34.65,54.29c-.32-1.41-1.11-2.44-1.77-2.29s-.92,1.42-.6,2.83,1.11,2.44,1.76,2.29S35,55.71,34.65,54.29Z" />
            <path fill={this.hair} d="M12,59.51c0-10.45,3-1.72,10.87-5.33,7.14-3.26,10.87-3.91,10.87,5.33,0,7.62-5.18,11.85-10.87,11.85C16.82,71.36,12,67.13,12,59.51Z" />
            <path fill={this.skin} d="M8.17,22.75c1.22-1.77,1.81-3,.57-3.88s-3.25-.12-4.47,1.65-1.2,3.91.05,4.77S7,24.52,8.17,22.75Z" />
            <polygon fill={this.shirt} points="0 40.41 4.08 46.21 7.38 46.21 7.38 42.23 6.87 33.79 7.59 25.2 2.52 23.33 0.72 34.68 0 40.41" />
            <path fill={this.skin} d="M37.27,20.94c-1.15-1.82-1.15-1.82-.69-2.43.92-1.21,3.25,0,4.41,1.81s.12,4.77-1.15,5.59S38.43,22.75,37.27,20.94Z" />
            <polygon fill={this.shirt} points="45.83 40.41 41.75 46.21 39.28 45.51 38.31 43.8 38.69 34.95 36.92 25.01 42.06 23.32 45.36 34.23 45.83 40.41" />
          </g>
        </svg>
      );
    }

    return (
      <svg transform="rotate(180)" viewBox="0 0 39.97 75.83">
        <g>
          <path fill={this.shoes} d="M16.45,62.64c1.7,1.68,2,6.91,1.1,10.2s-2.5,4.46-4.66.44,0-10.61,0-10.61S15.62,61.82,16.45,62.64Z" />
          <path fill={this.skin} d="M9.05,51s3.51,15.57,4.27,16.92,3.76,1.57,3.76-2.78C17.08,64.2,16,49.9,16,49.9Z" />
          <path fill={this.shoes} d="M24.19,62.64c-1.7,1.68-2,6.91-1.09,10.2s2.49,4.46,4.65.44,0-10.61,0-10.61S25,61.82,24.19,62.64Z" />
          <path fill={this.skin} d="M31.59,51s-3.51,15.57-4.27,16.92S23.73,71,23.73,66.66c0-.92.91-16.76.91-16.76Z" />
          <path fill={this.pants} d="M32.83,54c-2,2.88-2.79,6.88-12.31,6.88-9,0-10.34-2.91-12.32-6-4.07-6.26-.48-9.2-.13-12.11.68-5.69-2.83-17.33-2.83-17.33H33.89S31.59,39,32.66,42.84C33.38,45.42,35.94,49.61,32.83,54Z" />
          <path fill={this.shirt} d="M26.35,33.6c-3.14,0-5.77,1.6-6.38,3.72-.62-2.12-3.25-3.72-6.39-3.72-3.6,0-6.31-.14-6.31,2.45s7.54,7.51,9.4,7.51h6.59c1.87,0,9.4-4.93,9.4-7.51S30,33.6,26.35,33.6Z" />
          <path fill={this.shirt} d="M20.19,39c11,0,15.85-9,19.69-4.15.2-2.93-.6-8-2.86-10.87-4.38-5.56-9.81-7.61-16.83-7.45-7.5.16-13.77,1.8-18.12,7.45C0,26.72.05,32.3.05,35.42,5.26,29.83,9.16,39,20.19,39Z" />
          <path fill={this.skin} d="M29.4,17.48c0,3.75-1.51,15.12-9.43,15.12s-9.44-11.21-9.44-15.12C10.53,10.6,13.66,7,20,7S29.4,10.6,29.4,17.48Z" />
          <path fill={this.hair} d="M28.71,23.07a9.89,9.89,0,0,1-8.44,4.31c-3.72,0-7.44-1.84-8.71-3.23-4.88-5.31.43-18,5.79-19.36.82-.21,2.53.52,3.46.52s1-.77,1.77-.63C29.33,5.88,32.19,17.24,28.71,23.07Z" />
          <ellipse fill={this.hair} cx="20.81" cy="5.31" rx="7.29" ry="5.31" />
          <path fill={this.skin} d="M21.93,30.83c0,.93-1.18,2.68-2,2.68s-2-1.75-2-2.68,1.18-.68,2-.68S21.93,29.9,21.93,30.83Z" />
          <polygon fill={this.shirt} points="0 34.86 0.47 38.46 6.08 37.15 6.63 34.47 0.14 31.82 0 34.86" />
          <polygon fill={this.skin} points="0.98 38.35 3.23 52.35 5.74 50.82 6.08 37.15 0.98 38.35" />
          <path fill={this.skin} d="M33.68,52.35c-1.15,1.82.06.88-1,3-.68,1.35,2.34.81,3.5-1s1.05-3.95-.22-4.76S34.84,50.54,33.68,52.35Z"/>
          <path fill={this.skin} d="M6.5,52.35c1.15,1.82-.06.88,1,3,.68,1.35-2.34.81-3.5-1S3,50.42,4.24,49.61,5.34,50.54,6.5,52.35Z"/>
          <polygon fill={this.skin} points="38.95 38.35 36.7 52.35 34.33 51.07 33.85 37.15 38.95 38.35"/>
          <polygon fill={this.shirt} points="39.97 34.86 39.5 38.46 33.68 37.19 33.17 34.91 39.83 31.82 39.97 34.86" />
        </g>
      </svg>
    );
  }
}

export default Client;