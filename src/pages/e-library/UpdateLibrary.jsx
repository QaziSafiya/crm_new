import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddCircleIcon from "../../components/icons/AddCircleIcon.jsx";
import DeleteIcon from "../../components/icons/DeleteIcon.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import SuccessMessage from "../../components/messages/SuccessMessage.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";

export default function UpdateLibrary() {
    const { id } = useParams();

    const { token } = useAuth();

    const [library, setLibrary] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchService = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${BASE_URL}/library/${id}`, {
                headers: new Headers({
                    'Authorization': `Basic ${token}`,
                }),
            });

            if (!res.ok) {
                throw new Error('Could not fetch library.');
            }

            const library = await res.json();

            setLibrary({
                ...library,
            });
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchService();
    }, []);


    const handleChange = e => {
        setLibrary({
            ...library,
            [e.target.name]: e.target.value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);
            setError('');

            const res = await fetch(`${BASE_URL}/library/${id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(library),
            });

            if (!res.ok) {
                throw new Error('Could not update library');
            }

            setSuccess('Library has been updated successfully');
        } catch (e) {
            setError(e.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className='container'>
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Update Library</h6>
                    {
                        success ? <SuccessMessage message={success} /> : null
                    }
                    {
                        error ? <ErrorMessage message={error} /> : null
                    }
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center p-1rem">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : error
                                ? null
                                : (
                                    <div className="section">
                                        <form onSubmit={handleSubmit} className="flex dir-col g-1rem">
                                            <div className="flex dir-col g-1rem">
                                                <h6 className="text-primary">Library Details</h6>
                                                <div className="flex ai-center g-1rem">
                                                    <div className="field flex-1">
                                                        <label htmlFor="subject" className="label text-primary">Subject</label>
                                                        <input name="subject" value={library.subject} onChange={handleChange} type="text" className="input" id="subject" placeholder="Subject of case" />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="section" className="label text-primary">Section</label>
                                                        <input name="section" value={library.section} onChange={handleChange} type="text" className="input" id="section" placeholder="Section of case" />
                                                    </div>
                                                </div>
                                                <div className="flex ai-center g-1rem">
                                                    <div className="field flex-1">
                                                        <label htmlFor="ao_order" className="label text-primary">AO Order</label>
                                                        <input name="ao_order" onChange={handleChange} value={library.ao_order} type="text" className="input" id="ao_order" placeholder="AO Order" />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="itat_no" className="label text-primary">ITAT No.</label>
                                                        <input name="itat_no" onChange={handleChange} value={library.itat_no} type="text" className="input" id="itat_no" placeholder="ITAT No." />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="pan" className="label text-primary">PAN</label>
                                                        <input name="pan" onChange={handleChange} value={library.pan} type="text" className="input" id="pan" placeholder="PAN No." />
                                                    </div>
                                                </div>
                                                <div className="flex ai-center g-1rem">
                                                    <div className="field flex-1">
                                                        <label htmlFor="sub_section" className="label text-primary">Sub Section</label>
                                                        <input name="sub_section" onChange={handleChange} value={library.sub_section} type="text" className="input" id="sub_section" placeholder="Sub section" />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="rsa_no" className="label text-primary">RSA No.</label>
                                                        <input name="rsa_no" onChange={handleChange} value={library.rsa_no} type="text" className="input" id="rsa_no" placeholder="RSA No." />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="appeal_no" className="label text-primary">Appeal</label>
                                                        <input name="appeal_no" onChange={handleChange} value={library.appeal_no} type="text" className="input" id="appeal_no" placeholder="Appeal No." />
                                                    </div>
                                                </div>
                                                {/* ////// */}
                                                <div className="flex ai-center g-1rem">
                                                    <div className="field flex-1">
                                                        <label htmlFor="bench" className="label text-primary">Bench</label>
                                                        <input name="bench" onChange={handleChange} value={library.bench} type="text" className="input" id="bench" placeholder="Bench detail" />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="appellant" className="label text-primary">Appellant</label>
                                                        <input name="appellant" onChange={handleChange} value={library.appellant} type="text" className="input" id="appellant" placeholder="Appellant detail" />
                                                    </div>
                                                </div>
                                                {/* ///////// */}
                                                <div className="flex ai-center g-1rem">
                                                    <div className="field flex-1">
                                                        <label htmlFor="respondent" className="label text-primary">Respondent</label>
                                                        <input name="respondent" onChange={handleChange} value={library.respondent} type="text" className="input" id="respondent" placeholder="Respondent Detail" />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="appeal_type" className="label text-primary">Appeal Type</label>
                                                        <input name="appeal_type" onChange={handleChange} value={library.appeal_type} type="text" className="input" id="appeal_type" placeholder="Appeal Type" />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="appeal_filed_by" className="label text-primary">Appeal Filled by </label>
                                                        <input name="appeal_filed_by" onChange={handleChange} value={library.appeal_filed_by} type="text" className="input" id="appeal_filed_by" placeholder="Appeal filled by " />
                                                    </div>
                                                </div>
                                                {/* ////////////// */}
                                                <div className="flex ai-center g-1rem">
                                                    <div className="field flex-1">
                                                        <label htmlFor="tribunal_order_date" className="label text-primary">Tribunal Order Date</label>
                                                        <input name="tribunal_order_date" onChange={handleChange} value={library.tribunal_order_date} type="date" className="input" id="tribunal_order_date" />
                                                    </div>
                                                    <div className="field flex-1">
                                                        <label htmlFor="assessment_year" className="label text-primary">Assesment Year</label>
                                                        <input name="assessment_year" onChange={handleChange} value={library.assessment_year} type="text" className="input" id="assessment_year" placeholder="(eg.2021)" />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <label htmlFor="order_result" className="label text-primary">Order Result </label>
                                                    <input name="order_result" onChange={handleChange} value={library.order_result} type="text" className="input" id="order_result" placeholder="Result detail..." />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="judgment" className="label text-primary">Judgememt</label>
                                                    <textarea name="judgment" onChange={handleChange} value={library.judgment} className="textarea" id="judgment" placeholder="Judgement Detail...."></textarea>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="conclusion" className="label text-primary">Conclusion</label>
                                                    <textarea name="conclusion" onChange={handleChange} value={library.conclusion} className="textarea" id="conclusion" placeholder="Conclusion Detail..."></textarea>
                                                </div>
                                            </div>
                                            <button className="button is-primary" disabled={updating}>
                                                {
                                                    updating
                                                        ? <span className="spinner small"></span>
                                                        : 'Update Library'
                                                }
                                            </button>
                                        </form>
                                    </div>
                                )
                    }
                </div>
            </div>
        </div>
    )
}