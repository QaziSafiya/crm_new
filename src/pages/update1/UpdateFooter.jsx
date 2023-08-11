import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

const footerData = {
    "facebook":"fb url",
     "instagram":"test",
     "twitter":"test",
     "youtube":"test",
     "whatsapp":"test",
     "emails":"test",
     "phone":"test",
     "address":"test",
     "copywrite":"test"
};

export default function UpdateFooter() {
    
    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Footer</h6>
                    <div className="section p-0">
                        <div className="scrollable p-1rem">
                            <form onSubmit={handleSubmit} className="flex dir-col g-1rem">
                                <div className="field">
                                    <label htmlFor="fb" className="label">Facebook</label>
                                    <input 
                                        type="text" 
                                        className="input" 
                                        id="fb" 
                                        name="facebook" 
                                        defaultValue={footerData.facebook}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="ig" className="label">Instagram</label>
                                    <input 
                                        type="text" 
                                        className="input" 
                                        id="ig" 
                                        name="instagram" 
                                        defaultValue={footerData.instagram}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="tw" className="label">Twitter</label>
                                    <input 
                                        type="text" 
                                        className="input" 
                                        id="tw" 
                                        name="twitter" 
                                        defaultValue={footerData.twitter}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="yt" className="label">Youtube</label>
                                    <input 
                                        type="text" 
                                        className="input" 
                                        id="yt" 
                                        name="youtube" 
                                        defaultValue={footerData.youtube}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="wa" className="label">Whatsapp</label>
                                    <input 
                                        type="tel" 
                                        className="input" 
                                        id="wa" 
                                        name="whatsapp" 
                                        defaultValue={footerData.whatsapp}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="email" className="label">Email</label>
                                    <input 
                                        type="email" 
                                        className="input" 
                                        id="email" 
                                        name="email"
                                        defaultValue={footerData.emails} 
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="phone" className="label">Phone</label>
                                    <input 
                                        type="tel" 
                                        className="input" 
                                        id="phone" 
                                        name="phone" 
                                        defaultValue={footerData.phone}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="address" className="label">Address</label>
                                    <textarea 
                                        className="textarea" 
                                        id="address"
                                        name="address"
                                        defaultValue={footerData.address}
                                    ></textarea>
                                </div>
                                <div className="field">
                                    <label htmlFor="copyright" className="label">Copyright</label>
                                    <textarea
                                        className="textarea" 
                                        id="copyright" 
                                        name="copyright"
                                        defaultValue={footerData.copywrite}
                                    ></textarea>
                                </div>
                                <button className="button is-primary">Update Footer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}