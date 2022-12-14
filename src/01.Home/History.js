import StyledHistory from "../Styles/StyledHistory";
import StatusColor from "../Styles/StatusColor";
import { useEffect, useState, useRef } from "react";

export default function History({ userData }) {
  const sum = (a, b) => a + b;
  const balance = userData
    .filter((item) => item.status === "green")
    .map((i) => Number(i.value))
    .reduce(sum, 0);

  const sumOfRed = (a, b) => a + b;
  const negativeBalance = userData
    .filter((item) => item.status === "red")
    .map((i) => Number(i.value))
    .reduce(sumOfRed, 0);

  const totalBalance = balance - negativeBalance;
  const [seeBalance, setSeeBalance] = useState(true);
  const bottomRef = useRef(null);
  useEffect(() => {
    if (seeBalance) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setSeeBalance(false);
  }, []);

  return (
    <StyledHistory totalBalance={totalBalance}>
      <main>
        <span>
          {userData.map((item, index) => (
            <ListTransactions
              date={item.date}
              description={item.description}
              value={Number(item.value).toFixed(2)}
              status={item.status}
              key={index}
            />
          ))}
        </span>

        <section ref={bottomRef}>
          <h3>BALANCE</h3>
          <h4>{totalBalance.toFixed(2)}</h4>
        </section>
      </main>
    </StyledHistory>
  );
}

function ListTransactions({ date, description, value, status }) {
  return (
    <section>
      <nav>
        <nobr>
          <p>{date}</p>
        </nobr>
        <h1>{description}</h1>
      </nav>
      <StatusColor status={status}> {value} </StatusColor>
    </section>
  );
}
