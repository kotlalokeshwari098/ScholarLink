import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function ScholarshipCard(prop) {
    // console.log(prop);
    const [bookMarkList,setBookMarkList]=useState([])
    return (
        <div>
            <Link to={`/scholarshiplist/${prop.items.name}`}>
                <div className='border w-auto flex'>
                    
                    <div id={prop.items.id}>
                        <p>country name:{prop.countryName.country}</p>
                        <p>university name:{prop.universityName.name}</p>
                        <p className='font-bold'>scholarshipName: {prop.items.name}</p>
                        <p>DegreeLevel: {prop.items.degreeLevel}</p>
                        <p>amount: {prop.items.amount}</p>
                        <p>deadline:{prop.items.deadline}</p>
                    </div>
                    <div className=''>
                        {/* <span className="material-symbols-outlined "
                        onClick={addToBookMark}>
                            bookmark
                        </span> */}

                    </div>

                </div>
            </Link>
        </div>
    )
}

export default ScholarshipCard
