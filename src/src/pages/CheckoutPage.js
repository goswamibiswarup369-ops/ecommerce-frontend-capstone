import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Checkout from "../components/Checkout/Checkout";
import { AuthContext } from "../contexts/AuthContext";

function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const [done, setDone] = useState(false);

  if (!user) return <Navigate to="/" replace />;

  if (done) {
    return (
      <div className="page center-msg">
        Order placed successfully! Thank you, {user.name}.
      </div>
    );
  }

  return (
    <div className="page">
      <Checkout onSuccess={() => setDone(true)} />
    </div>
  );
}

export default CheckoutPage;
