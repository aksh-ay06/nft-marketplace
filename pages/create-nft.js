import { useState,useMemo,useCallback,useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button,Input } from "../components";
import images from '../assets';


const Createnft = () => {
  const theme = useTheme();
  const [fileUrl,setFileUrl] = useState(null);
  const [formInput,setFormInput] = useState({name:'',price:'',description:''});

  const onDrop = useCallback(() => {
    // uplaod image to the block chain ipfs
  },[]);

  const {getRootProps,getInputProps,isDragActive,isDragAccept,isDragReject} = useDropzone({
    onDrop,
    accept:'image/*',
    maxSize:5000000,
  })

  const fileStyle = useMemo(()=>(
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && 'border-file-active'}
    ${isDragAccept && 'border-file-accept'}
    ${isDragReject && 'border-file-reject'}`
  ),[isDragActive,isDragAccept,isDragReject]);

  console.log(formInput);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md-w-full">
        <h1 className="flex-1 before:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Create New Items</h1>
        <div className="mt-16">
        <p className="flex-1 before:font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload Files</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM,Max 5 mb.
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image 
                  src={images.upload}
                  width={100}
                  height={100}
                  objectFit="contain"
                  alt="file upload"
                  className={theme==='light' && 'filter invert'} />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  or Browse media on your device.
                </p>
              </div>
            </div>
            {fileUrl && (<aside>
              <div>
                <Image src={fileUrl} alt="asset_file"/>
              </div>
            </aside>
            )}
          </div>
        </div>
        <div>
          <Input
            inputType='input'
            title="Name"
            placeholder='NFT Name.'
            handleClick={(e)=>setFormInput({...formInput,name:e.target.value})}
          />
          <Input
            inputType='textarea'
            title="Description"
            placeholder='Description of your NFT.'
            handleClick={(e)=>setFormInput({...formInput,description:e.target.value})}
          />
          <Input
            inputType='number'
            title="Price"
            placeholder='Enter Price.'
            handleClick={()=>setFormInput({...formInput,price:e.target.value})}
          />
          <div className="mt-7 w-full flex justify-end">
            <Button 
              btnName='Create NFT'
              className='rounded-xl'
              handleClick={()=>{}}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Createnft;