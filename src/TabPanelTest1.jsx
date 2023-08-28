import React, { useRef, useEffect, useState } from 'react';
import openlion from './workspace/lionAPI/openlion';

const TabPanelTest1 = () => {
  //   const setButtonRef = useRef(null);
  //   const titleInputRef = useRef(null);

  //   useEffect(() => {
  //     const setButton = setButtonRef.current;
  //     const titleInput = titleInputRef.current;
  //     setButton.addEventListener('click', () => {
  //       const title = titleInput.value;
  //       window.lionAPI.setTitle(title);
  //     });

  //     return () => {
  //       setButton.removeEventListener('click', () => {
  //         const title = titleInput.value;
  //         window.lionAPI.setTitle(title);
  //       });
  //     };
  //   }, []);



  //   return (
  //     <div>
  //       hello world
  //       Title: <input ref={titleInputRef} />
  //       <button ref={setButtonRef} type="button">
  //         Set
  //       </button>
  //     </div>
  //   );
  // };




  const [item, setitem] = useState('');
  const [filepath, setfilepath] = useState('');
  const [itemnumber, setitemnumber] = useState(0);


  //生成handleInputChange方法
  const handleInputChange = (e) => {
    setitem(e.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const title = item;
    event.preventDefault();
    console.log('handleClick');
    console.log(window.myAPI);
    window.lionAPI.setTitle(title);
    // window.ipcRenderer.send('set-title', title);

  };

  const handlefilepath = async (event) => {
      event.preventDefault();

      console.log('handlefilepath');
      const filePath = await window.lionAPI.openFile()
      setfilepath(filePath)
    }


    openlion.onUpdateCounter((_event, value) => {
      const oldValue = Number(itemnumber);
      const newValue = oldValue + value;
      setitemnumber(newValue);
      console.log(_event.sender);
    })


  return (
    <div>
      hello world
      Title: <input value={item} onChange={handleInputChange} />
      <button onClick={handleClick} type="button">
        Set
      </button>
      <button type="button" id="btn" onClick={handlefilepath} >Open a File</button>
      File path: <strong id="filePath" >{filepath}</strong>
      Current value: <strong id="counter">{itemnumber}</strong>
    </div>
  );
}

export default TabPanelTest1;