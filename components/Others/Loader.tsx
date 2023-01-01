import Image from 'next/image'

import images from "../../assets";

const Loader = () => {
  return (
    <div className='flexCenter min-h-screen'>
        <Image src={images.loader} alt='' height={100} width={100} />
    </div>
  )
}

export default Loader