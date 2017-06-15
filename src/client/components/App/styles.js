export default `
  .App-wrapper {
    position: relative;
    min-height: 100%;
  }
  .App-content {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  .Logo-wrapper {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 50px;
    text-decoration: none;
    font-family: monospace;
  }
  @media (max-width: 1024px) {
    .Logo-wrapper {
      position: absolute;
      height: 50px;
    }
  }
  .Logo-js {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    font-size: 24px;
    align-items: flex-end;
    height: 50px;
    font-weight: bold;
    line-height: 16px;
    padding: 2px;
  }
  .Logo-blog {
    text-align: center;
    font-size: 18px;
  }
  .App-button {
    position: fixed;
    font-family: monospace;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 35px;
    overflow: hidden;
    cursor: pointer;
    opacity: 1;
    transition:
      opacity 0.2s ease-in-out, width 0.2s ease-in-out, height 0.2s ease-in-out;
  }
  .App-button:hover {
    opacity: 0.8;
  }
  @keyframes blink {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .App-button-loading {
    -webkit-animation-name: blink,
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-duration: 0.75s;
    -webkit-animation-direction: alternate;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-delay: 0.2s;

    animation-name: blink,
    animation-timing-function: ease-in-out;
    animation-duration: 0.75s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
    width: 0;
    padding: 0;
    height: 0;
  }

  .Login-button {
    top: 10px;
    right: 10px;
  }
  .App-update {
    position: fixed;
    top: 40px;
    padding: 10px;
    font-size: 18px;
    text-align: center;
    left: calc(50vw - 250px);
    width: 500px;
  }
  .App-console {
    position: fixed;
    bottom: 0;
    width: 100vw;
    font-family: monospace;
  }
  @media (max-width: 1024px) {
    .App-console {
      display: none;
    }
  }
  .App-console-bar {
    height: 30px;
    width: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-left: 10px;
  }
  .App-console-title {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    flex: 1;
  }
  .App-console-expand {
    flex: 0;
    display: flex;
    align-items: center;
  }
  .App-console-wrapper {
    padding: 0 10px 10px 10px;
  }
  .App-console-textarea {
    display: block;
    width: 100%;
    height: 250px;
    overflow-y: scroll;
  }
  .App-console-textarea::-webkit-scrollbar {
    background-color: transparent;
  }
  .App-console-cmd-wrapper {
    display: flex;
  }
  .App-console-cmd-sudo {
    flex: 0 0 15px;
    width: 15px;
    font-size: 18px;
    font-family: monospace;
    background: transparent;
    border: 0;
  }
  .App-console-cmd {
    flex: 1;
  }
  .App-console-cmd input {
    border: 0;
    color: inherit;
    width: 100%;
    background: transparent;
    outline: none;
    font-size: 18px;
    font-family: monospace;
  }
`;
