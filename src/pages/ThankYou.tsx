
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const bitcoinAddresses = [
  "bc1qe4kqtp0mnz67sd9d39u3kpau4avmglxt9salse",
  "bc1ql5jxlvdqlp4sn8y7s4azxcm8c5247jq4nc846f",
  "bc1qgdutjfwtstzepysr6kepzkpwz00ycyn8cpxwpk",
  "bc1q5rcq45s6vt3ezn38t446a25ehj3cfr3jlhxz64",
  "bc1qcygy3dwkgy3ujm6yrlst96tp9kef574vjalatd"
];

const ThankYou = () => {
  const location = useLocation();
  const [btcAmount, setBtcAmount] = useState<string>("0");
  const total = location.state?.total || 0;
  const btcAddress = bitcoinAddresses[Math.floor(Math.random() * bitcoinAddresses.length)];

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur');
        const data = await response.json();
        const btcPrice = data.bitcoin.eur;
        const amount = (total / btcPrice).toFixed(8);
        setBtcAmount(amount);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
        setBtcAmount("Error calculating BTC amount");
      }
    };

    fetchBtcPrice();
  }, [total]);

  if (!total) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Error</h1>
          <p>No order total found. Please try checking out again.</p>
          <Link to="/products">
            <Button variant="ghost" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Thank You for Your Order!</h1>
          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Instructions</h2>
            <p className="mb-4">Please send exactly:</p>
            <p className="text-2xl font-bold mb-4">{btcAmount} BTC</p>
            <p className="mb-2">To this Bitcoin address:</p>
            <p className="font-mono bg-muted p-4 rounded break-all mb-6">{btcAddress}</p>
            <div className="text-sm text-muted-foreground">
              <p>Your order will be processed once payment is confirmed.</p>
              <p className="mt-2">Please save these payment details for your records.</p>
            </div>
          </div>
          <Link to="/products">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
