import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUser,
  faEnvelope,
  faPhone,
  faIndianRupeeSign,
  faCreditCard,
  faBuildingColumns,
  faMobileScreen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function DonationPage() {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handlePresetClick = (amt) => {
    setAmount(amt);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for donating ₹${amount} ❤️`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      
      

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl grid lg:grid-cols-2 overflow-hidden">
        
        <div className="bg-[#254151] text-white p-10 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold  flex items-center justify-center gap-3 text-[#F4CE50] Chelsea">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="text-orange-500" />
          Support Our Mission
        </h1>
        <p className=" mt-3">
          Your contribution helps us provide education, healthcare, and hope.
        </p>
            </div>
          <h2 className="text-3xl font-bold mb-4 text-center smooch ">
            Make a Difference Today
          </h2>

          <p className="text-gray-200 mb-6 leading-7">
            Every donation brings hope to children and families in need.
            Together we can create lasting change in society.
          </p>

          <ul className="space-y-3 text-sm">
            <li><FontAwesomeIcon icon={faCheck} className="itaclic font-Chelsea" /> Food Campaigns</li>
            <li><FontAwesomeIcon icon={faCheck} className="itaclic font-Chelsea" /> Education for underprivileged children</li>
            <li><FontAwesomeIcon icon={faCheck} className="itaclic font-Chelsea" /> Healthcare support</li>
            <li><FontAwesomeIcon icon={faCheck} className="itaclic font-Chelsea" /> Women empowerment programs</li>
            <li><FontAwesomeIcon icon={faCheck} className="itaclic font-Chelsea" /> Rural development initiatives</li>
          </ul>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Amount Selection */}
            <div>
              <label className="font-semibold text-gray-700">
                Select Donation Amount
              </label>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {presetAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => handlePresetClick(amt)}
                    className={`py-2 rounded-lg border font-semibold transition
                      ${
                        amount == amt
                          ? "bg-orange-500 text-white"
                          : "hover:bg-orange-100"
                      }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mt-3 flex items-center border rounded-lg px-3">
                <FontAwesomeIcon icon={faIndianRupeeSign} />
                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full p-2 outline-none"
                />
              </div>
            </div>

            {/* Donor Details */}
            <div className="grid md:grid-cols-2 gap-4">
              
              <div className="flex items-center border rounded-lg px-3">
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full p-2 outline-none"
                />
              </div>

              <div className="flex items-center border rounded-lg px-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-2 outline-none"
                />
              </div>

              <div className="flex items-center border rounded-lg px-3 md:col-span-2">
                <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full p-2 outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            {/* <div>
              <label className="font-semibold text-gray-700">
                Payment Method
              </label>

              <div className="grid grid-cols-3 gap-3 mt-3">
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 border rounded-lg flex flex-col items-center gap-2
                    ${
                      paymentMethod === "card"
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-100"
                    }`}
                >
                  <FontAwesomeIcon icon={faCreditCard} />
                  Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 border rounded-lg flex flex-col items-center gap-2
                    ${
                      paymentMethod === "upi"
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-100"
                    }`}
                >
                  <FontAwesomeIcon icon={faMobileScreen} />
                  UPI
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-3 border rounded-lg flex flex-col items-center gap-2
                    ${
                      paymentMethod === "netbanking"
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-100"
                    }`}
                >
                  <FontAwesomeIcon icon={faBuildingColumns} />
                  Bank
                </button>
              </div>
            </div> */}

            {/* Donate Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#254151] text-white font-semibold rounded-lg hover:bg-orange-500 transition text-lg flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              Donate ₹{amount || 0}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
