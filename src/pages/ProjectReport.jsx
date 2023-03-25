import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { InputBox,TextArea,Option,LabelBox,MultipleInputBox,Heading,Section,Button,MainHeading} from "./styles/projectReportStyles";
import styled from "styled-components";
import { useContext, useState } from "react";
import { GrAdd } from "react-icons/gr"
import { useForm } from "react-hook-form";
import { StoreContext } from "../store/store-context";
import { PDF_DOC } from "../store/actions";
import { useNavigate } from "react-router-dom";


export default function ProjectReport() {
    
    const [rented, setRented] = useState(false)
    const [owner, setOwner] = useState(false)
    const [pnmList, setPnmList] = useState([])
    const [loan,setLoan]=useState(false)
    const [businessName,setBusinessName] = useState('');
    const { handleSubmit, register, setValue, getValues } = useForm();
    const [_, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    
    const addPlantMachineryHandler = () => {
        setPnmList((prev) => [...prev, {}])
    }

    const pdfHandler = (values) => {
        console.log(pnmList);
        try {
            dispatch({
                type: PDF_DOC,
                payload: {
                    businessName,
                    pnmList,
                    owner,
                    rented,
                    loan,
                    values,
                }
            })
            
            navigate('/pdfViewer')
        } catch (err) {
            console.log(err);
        }
    }

    const onSubmitting=()=>{
        const values = getValues();
        pdfHandler(values);
    }

    return <div className='container'>
        <Sidebar />
        <div className="main">
            <Topbar />
            <div className="inner-container">
                <form onSubmit={handleSubmit(onSubmitting)}>
                    <MainHeading>Project report</MainHeading>
                    <InputBox>
                        <LabelBox>
                            <label htmlFor='business_name'>Business Name</label>
                            <Option>(required)</Option>
                        </LabelBox>
                        {/* <input
                        id='business_name'
                        className="input is-small"
                        type='text'
                        placeholder="Business Name"
                    /> */}
                        <select onChange={(e)=>setBusinessName(e.target.value)} name="businessName" id="business_name" className="select w-max-content">
                            <option disabled selected value> -- select an option -- </option>
                            <option value="Flour Mill">Flour Mill</option>
                            <option value="Toilet Soap Manufacturing Unit">Toilet Soap Manufacturing Unit</option>
                            <option value="Tomato sauce Manufacturing Unit">Tomato sauce Manufacturing Unit</option>
                            <option value="Roasted Rice Flakes">Roasted Rice Flakes</option>
                            <option value="Banana Fiber Extraction and weaving">Banana Fiber Extraction and weaving</option>
                            <option value="Computer Assembling">Computer Assembling</option>
                            <option value="Light Engineering(Nuts, Bolts, Washers, Rivets etc.)">Light Engineering(Nuts, Bolts, Washers, Rivets etc.)</option>
                            <option value="Metal Based Industries: Agricultural Implements, Cutleries& Hand Tools">Metal Based Industries: Agricultural Implements, Cutleries& Hand Tools</option>
                            <option value="Manufacturing of Paper Products (Paper Cups)">Manufacturing of Paper Products (Paper Cups)</option>
                            <option value="Curry and Rice Powder">Curry and Rice Powder</option>
                            <option value="Bakery Products">Bakery Products</option>
                            <option value="Steel Furniture">Steel Furniture</option>
                            <option value="Desiccated Coconut Powder">Desiccated Coconut Powder</option>
                            <option value="Foot Wear">Foot Wear</option>
                            <option value="Wooden Furniture Manufacturing Unit">Wooden Furniture Manufacturing Unit</option>
                            <option value="Manufacturing of Paper Napkins">Manufacturing of Paper Napkins</option>
                            <option value="Pappad Manufacturing">Pappad Manufacturing</option>
                            <option value="Readymade Garments">Readymade Garments</option>
                            <option value="Pickle Unit">Pickle Unit</option>
                            <option value="Manufacturing of Palm Plate">Manufacturing of Palm Plate</option>
                            <option value="Note Book Manufacturing">Note Book Manufacturing</option>
                            <option value="Dairy Products">Dairy Products</option>
                            <option value="Detergent Power and Cakes">Detergent Power and Cakes</option>
                            <option value="Sanitary Napkin Manufacturing Project">Sanitary Napkin Manufacturing Project</option>
                            <option value="General Engineering Workshop">General Engineering Workshop</option>
                            <option value='Rubberised Coir Mattresses'>Rubberised Coir Mattresses</option>
                            <option value='Beauty Parlor'>Beauty Parlor</option>
                        </select>
                    </InputBox>
                    <InputBox>
                        <label htmlFor="market_potential">Market Potential</label>
                        <TextArea
                            className="input"
                            id="market_potential"
                            placeholder="Tell us about Market Potential of your Business..."
                            {...register("market_potential")}        
                        />
                    </InputBox>
                    <InputBox>
                        <label htmlFor="location">Location</label>
                        <TextArea
                            className="input"
                            id="location"
                            placeholder="Tell us about Location of your Business..."
                            {...register("location")}
                        />
                    </InputBox>
                    <InputBox>
                        <label htmlFor="manufacturing_process">Manufacturing Process</label>
                        <TextArea
                            className="input"
                            id="manufacturing_process"
                            placeholder="Tell us about Manufacturing process of your product..."
                            {...register("manufacturing_process")}
                        />
                    </InputBox>
                    <Section style={{ paddingTop: '1rem' }}>
                        <Heading>Land and Building</Heading>
                        <MultipleInputBox>
                            <InputBox>
                                <label htmlFor="land_building">Area of Land and Building</label>
                                <input
                                    className="input"
                                    id="land_building"
                                    placeholder="Area of Land and Building in sq/m"
                                    {...register("land_building")}
                                />
                            </InputBox>
                            <InputBox>
                                <input
                                    type='radio'
                                    id="rented"
                                    name="checkOwnership"
                                    checked={rented}
                                    onChange={() => { setRented(true); setOwner(false) }}
                                />
                                <label htmlFor="rented">Do you Rent the Land/Building</label>
                                <input
                                    style={{ marginLeft: "2rem" }}
                                    type='radio'
                                    id="ownership"
                                    name="checkOwnership"
                                    checked={owner}
                                    onChange={() => { setRented(false); setOwner(true) }}
                                />
                                <label htmlFor="ownership">Do you own the Land/Building</label>
                            </InputBox>
                        </MultipleInputBox>
                        {owner && <MultipleInputBox>
                            <InputBox>
                                <label htmlFor="value_of_land">Value of Land/building</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="value_of_land"
                                    placeholder="Value in ₹"
                                    {...register("value_of_land")}
                                />
                            </InputBox>
                            <InputBox>
                                <label htmlFor="depreciationValue">Depreciation Rate of Building</label>
                                <input
                                    className="input"
                                    id="depreciationValue"
                                    placeholder="Depreciation Rate of Building in %"
                                    {...register("depreciationValue")}
                                />
                            </InputBox>
                        </MultipleInputBox>}
                        {rented && <MultipleInputBox>
                            <InputBox>
                                <label htmlFor="securityDeposit">Value of Security Deposit</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="securityDeposit"
                                    placeholder="Security Deposit in ₹"
                                    {...register("securityDeposit")}
                                />
                            </InputBox>
                            <InputBox>
                                <label htmlFor="monthlyRent">Monthly Rent</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="monthlyRent"
                                    placeholder="Monthly Rent in ₹"
                                    {...register("monthlyRent")}
                                />
                            </InputBox>
                        </MultipleInputBox>}
                        <Heading>Plant and Machinery</Heading>
                        {pnmList && pnmList.length > 0 && pnmList.map((_, i) => {
                            return <MultipleInputBox key={i} >
                                <InputBox>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type='text'
                                        className="input"
                                        id="name"
                                        placeholder="Name"
                                        onChange={(e)=>pnmList[i].name=e.target.value}

                                    />
                                </InputBox>
                                <InputBox>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type='number'
                                        className="input"
                                        id="price"
                                        placeholder="Price in ₹"
                                        onChange={(e) => pnmList[i].price = e.target.value}
                                    />
                                </InputBox>
                                <InputBox>
                                    <label htmlFor="rate">Depriciation Rate</label>
                                    <input
                                        type='number'
                                        className="input"
                                        id="rate"
                                        placeholder="Deprectiation rate of the Machinery in %"
                                        onChange={(e) => pnmList[i].rate = e.target.value}
                                    />
                                </InputBox>
                            </MultipleInputBox>
                        })}
                        <Button type="button" onClick={addPlantMachineryHandler} className="button  is-small has-icon">Add <GrAdd /></Button>
                    </Section>
                    <Section style={{ paddingTop: '1rem' }}>
                        <Heading>Working Capital</Heading>
                        <MultipleInputBox>
                            <InputBox>
                                <label htmlFor="rawMaterial">Raw Material</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="rawMaterial"
                                    placeholder="Raw Material per Month "
                                    {...register("rawMaterial")}
                                />
                            </InputBox>
                            <InputBox>
                                <label htmlFor="wages">Wages</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="wages"
                                    placeholder="Wages per Month"
                                    {...register("wages")}
                                />
                            </InputBox>
                            <InputBox>
                                <label htmlFor="electricity_charges">Electricity Charges</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="electricity_charges"
                                    placeholder="Electricity charges per Month"
                                    {...register("electricity_charges")}
                                />
                            </InputBox>
                            <InputBox>
                                <label htmlFor="otherCharge">Other Charges</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="otherCharge"
                                    placeholder="Other charges per Month"
                                    {...register("otherCharge")}
                                />
                            </InputBox>
                        </MultipleInputBox>
                        <Heading>Finance</Heading>
                        <MultipleInputBox>
                            <InputBox>
                                <label htmlFor="promoter">Promoter's Contribution</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="promoter"
                                    placeholder="Promoter's Contribution"
                                    {...register("promoter")}
                                />
                            </InputBox>
                            <InputBox>
                                <input
                                    type='checkbox'
                                    id="loan"
                                    name="checkLoan"
                                    onClick={() => setLoan((prev) => !prev)}
                                />
                                <label htmlFor="loan">Do you have any Loan</label>
                            </InputBox>
                        </MultipleInputBox>
                        {loan && <MultipleInputBox>
                            <InputBox>
                                <label htmlFor="amountLoan">Amount Of Loan</label>
                                <input
                                    type='number'
                                    className="input"
                                    id="amountLoan"
                                    placeholder="Total Amount of Loan"
                                    {...register("amountLoan")}
                                />
                            </InputBox>
                            <InputBox>
                                <label htmlFor="interestRate">Interest rate on Loan</label>
                                <input
                                    type='number'
                                    id="interestRate"
                                    className="input"
                                    placeholder="Interest Rate on Loan yearly in %"
                                    {...register("interestRate")}
                                />
                            </InputBox>
                        </MultipleInputBox>
                        }
                    </Section>
                    <Heading>Turnover per Year</Heading>
                    <InputBox>
                        <label htmlFor="turnover">Expected Sale Turnover per Year</label>
                        <input
                            type='number'
                            id="turnover"
                            className="input"
                            placeholder="Total Turnover in year"
                            {...register("turnover")}
                        />
                    </InputBox>
                    <Button type="submit" className="button is-small has-icon">Generate Pdf</Button>
                </form>
            </div>
        </div>
    </div>
}