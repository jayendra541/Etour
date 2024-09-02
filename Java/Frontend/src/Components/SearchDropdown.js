import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchDropdown.css';

const SearchDropdown = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [searchName, setSearchName] = useState(''); 
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);
    const [searchCost, setSearchCost] = useState('');
    const [selectedPkgId, setSelectedPkgId] = useState('');
    const [selectedPkgId1, setSelectedPkgId1] = useState('');
    const [selectedPkgId3, setSelectedPkgId3] = useState('');
    const [selectedPkgId2, setSelectedPkgId2] = useState('');
    const [maxCost, setMaxCost] = useState('');
    const [dayno, setDayno] = useState('');

    let navigate = useNavigate();
    const inputStyle = {
        width: '200px', // Fixed width
        height: '30px', // Fixed height
        boxSizing: 'border-box', // Include padding and border in the width and height
        padding: '5px', // Internal padding
        border: '1px solid #ccc', // Border style
        borderRadius: '4px', // Rounded corners
        fontSize: '16px' // Font size
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === 'Search by Date') {
            setData1([]);
        } else if (option === 'Search by Name') {
            setData([]);
        } else if (option === 'Search by Cost') {
            setData2([]);
        } else if (data3.length > 0) {
            setData3([]);
        }
        console.log("Option selected:", option);
    }

    const fetchDataByName = async () => {
        try {navigate('/');
            const response = await fetch(`http://localhost:8080/api/subcategories/search/${searchName}`);
            const result = await response.json();
            setData(result);
            console.log("hello");

            console.log(result);
        } catch (error) {
            console.error('Error fetching data by name:', error);
        }
    };

    const fetchDataByCost = async () => {
        try {navigate('/');
            console.log(searchCost);
            const response2 = await fetch(`http://localhost:8080/api/by-cost-range/${searchCost}/${maxCost}`);
            const datahere = await response2.json();
            
            setData2(datahere);
            console.log("cost by sub",datahere);

         
        } catch (error) {
            console.error('Error fetching data by cost:', error);
        }
    };

    const fetchAdditionalData = async (pkgId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/package_master/${pkgId}`);
            const result = await response.json();
            setData3(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    const fetchAdditionalData2 = async (catMasterId) => {
        try {
            const response1 = await fetch(`http://localhost:8080/api/category_master/bycatMasterId/${catMasterId}`);
            const result = await response1.json();
            setData5(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    useEffect(() => {
        if (selectedPkgId && data3.pkgId) {
            setSelectedPkgId2(data3.catMasterId);
            fetchAdditionalData2(data3.catMasterId);
        }
    }, [data3, selectedPkgId]);

    const fetchAdditionalData1 = async (pkgId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/package_master/${pkgId}`);
            const result = await response.json();
            setData4(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    useEffect(() => {
        if (selectedPkgId1 && data4.pkgId) {
            setSelectedPkgId3(data4.catMasterId);
            fetchAdditionalData3(data4.catMasterId);
        }
    }, [data4, selectedPkgId1]);

    const fetchAdditionalData3 = async (catMasterId) => {
        try {
          
            const response2 = await fetch(`http://localhost:8080/api/category_master/bycatMasterId/${catMasterId}`);
            const result = await response2.json();
            setData6(result);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    const handleDateSearch = async () => {
        try {navigate('/');
            const response = await fetch(`http://localhost:8080/api/dateMaster/subcategories/${dayno}`);
            const result = await response.json();
            setData1(result);
            console.log("FEATCH BY STARTDATE AND END DATE");
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h3>Search Options:</h3>
            <div className='dropdown-container'>
                <div className="dropdown-button-wrapper">
                    <button onClick={() => handleOptionSelect('Search by Date')} className='dropdown-button'>
                        Search by Date
                    </button>
                </div>
                <div className="dropdown-button-wrapper">
                    <button onClick={() => handleOptionSelect('Search by Name')} className='dropdown-button'>
                        Search by Name
                    </button>
                </div>
                <div className="dropdown-button-wrapper">
                    <button onClick={() => handleOptionSelect('Search by Cost')} className='dropdown-button'>
                        Search by Cost
                    </button>
                </div>
            </div>

            {selectedOption === 'Search by Date' && (
                <div className='dropdown-container'>
                   <h4>Enter Name:</h4>
                    <input
                        type="text"
                        value={dayno}
                        onChange={(e) => setDayno(e.target.value)}
                        style={inputStyle}
                    />
                        <div>
                            <button type="button" onClick={handleDateSearch} className="dropdown-button">
                                Search
                            </button>
                        </div>

                        
                        <div className='cards-container'>
                        {data1.map((item) => (
                            <div key={item.subCat_id} className='card'>
                                <img src={item.subCatImagePath} alt={item.subCat_name} className='card-image' />
                                <div className='card-content'>
                                    <h5 className='card-title'>{item.subCat_name}</h5>
                                    <p>Number of Days: {dayno}</p>
                                    {/* <p className='card-cost'>Cost: ${item.cost}</p> */}
                                    <button onClick={() => navigate(`/bypkgId/${item.subCat_id}`)} className='card-button'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                        <hr />

                       
                </div>
            )}

            {selectedOption === 'Search by Name' && (
                <div className='dropdown-container1'>
                    <h4>Enter Name:</h4>
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    
                    <button type="button" onClick={fetchDataByName} className="dropdown-button">
                        Search
                    </button>
                    {/* <div className='dropdown-container2'>
                        {data.map((item) => (
                            <div key={item.
                              index
                              }>
                                <p>Tour id: {item.subCat_id}</p>
                                <p>Tour name: {item.subCat_name}</p>
                                <button onClick={() => navigate(`/bypkgId/${item.subCat_id}`)} className="dropdown-button">View Details</button>
                                
                            </div>
                        ))}
                    </div> */}
                    <div className='cards-container'>
                        {data.map((item) => (
                            <div key={item.subCat_id} className='card'>
                                <img src={item.subCatImagePath} alt={item.subCat_name} className='card-image' />
                                <div className='card-content'>
                                    <h5 className='card-title'>{item.subCat_name}</h5>
                                    {/* <p className='card-cost'>Cost: ${item.cost}</p> */}
                                    <button onClick={() => navigate(`/bypkgId/${item.subCat_id}`)} className='card-button'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedOption === 'Search by Cost' && (
                <div className='dropdown-container1'>
                    <h4>Enter Cost:</h4>
                    <input
                        type="number"
                        placeholder="Enter minimum cost"
                        value={searchCost}
                        onChange={(e) => setSearchCost(e.target.value)}
                    />
                    <h4>Enter Cost:</h4>
                     <input
                        type="number"
                        placeholder="Enter maximum cost"
                        value={maxCost}
                        onChange={(e) => setMaxCost(e.target.value)}
                    />
                    <button onClick={fetchDataByCost} className="dropdown-button">
                        Search by Cost
                    </button>
                    {/* <div className='dropdown-container2'>
                        {data2.map((item, index) => (
                            <div key={index}>
                                <p>Tour id: {item.subCat_id}</p>
                                <p>Tour name: {item.subCat_name}</p>
                                <button onClick={() => navigate(`/bypkgId/${item.subCat_id}`)} className="dropdown-button">View Details</button>
                            </div>
                        ))}
                    </div> */}
                     <div className='cards-container'>
                        {data2.map((item) => (
                            <div key={item.subCat_id} className='card'>
                                <img src={item.subCatImagePath} alt={item.subCat_name} className='card-image' />
                                <div className='card-content'>
                                    <h5 className='card-title'>{item.subCat_name}</h5>
                                    {/* <p className='card-cost'>Cost: ${item.cost}</p> */}
                                    <button onClick={() => navigate(`/bypkgId/${item.subCat_id}`)} className='card-button'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    

                   
                </div>
            )}
        </div>
    )
}

export default SearchDropdown;





















