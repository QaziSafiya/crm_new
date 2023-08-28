import React, { useState } from 'react'

const BajajPolicyCard = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            to={item.path}
            style={{ color: 'gray' }}
            className="border gap-5 flex flex-col rounded-lg bg-white"
        >
            <div className="mt-4 px-5  flex justify-between items-center">
                <div className="rounded border" style={{ width: 100, height: 60 }}>
                    <img
                        className="w-full h-full object-contain"
                        src={item.img}
                        alt={'logo image'}
                    />
                </div>
                <div className="flex items-center gap-1 p-1">
                    <input className="mb-1" type="checkbox" />
                    <label className='' htmlFor="">Compare</label>
                </div>
            </div>
            <div className="px-5 flex justify-between items-center">
                <div className="px-1">
                    <p>IDV value</p>
                    <p>&#8377;{item.valueIDV.toLocaleString()}</p>
                </div>
                <button className="text-sm bg-red-500 text-white text-bold border py-2 px-4 rounded-full">
                    BUY NOW <br /> &#8377;{item.buyNow.toLocaleString()}
                </button>
            </div>
            <div className="flex items-center">
                <hr className="flex-grow border-t border-gray-300" />
                <div
                    className="w-4/12 text-center relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? 'Features ▲' : 'Features ▼'}
                </div>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className='px-5'>
                {isHovered ? (
                    <ul className='px-2 list-disc text-sm border'>
                        {item.features.map((e, index) => (
                            <li className='mb-2' key={index}>
                                {e}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='text-sm py-3'>
                        <div className='flex justify-between flex-wrap mb-4'>
                            <p>Base Primium</p>
                            <p>&#8377;{item.basePrimium}</p>
                        </div>
                        <div className='flex justify-between flex-wrap '>
                            <p>Compulsory Personal Accident</p>
                            <p>&#8377;{item.compulsoryPersionalAccident}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className='px-5 mb-2 flex justify-between items-center text-sm flex-wrap'>
                <p>Cashless Garage</p>
                <button className='border-none text-red-500 text-semibold'>Primium Breakup</button>
            </div>
        </div>
    )
}

export default BajajPolicyCard