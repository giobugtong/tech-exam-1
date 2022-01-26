import React from 'react';
import colors from "../images/colors.png"
import sum from "../images/sum.jpg"
import fight from "../images/fight.jpeg"
import bem from "../images/bem.jpg"
import filter from "../images/filter.png"
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return <>
    <div className="py-3 ps-2 d-flex flex-wrap justify-content-cneter align-items-center mx-auto" style={{ maxWidth: "1200px" }}>
      <Link to="/tech-exam-1/task-1" className="d-block mx-auto text-decoration-none text-dark">
        <div className="my-2 bg-light rounded shadow-sm pb-2">
          <Image src={colors} fluid width="300px" className="rounded"/>
          <div className="mt-2 text-center fw-bold">
            Task 1 - Colors
          </div>
        </div>
      </Link>
      
      <Link to="/tech-exam-1/task-2" className="d-block mx-auto text-decoration-none text-dark">
        <div className="my-2 bg-light rounded shadow-sm pb-2">
          <Image src={sum} fluid width="300px" className="rounded"/>
          <div className="mt-2 text-center fw-bold">
            Task 2 - Sum Function
          </div>
        </div>
      </Link>
      <Link to="/tech-exam-1/task-3" className="d-block mx-auto text-decoration-none text-dark">
        <div className="my-2 bg-light rounded shadow-sm pb-2">
          <Image src={fight} fluid width="300px" className="rounded"/>
          <div className="mt-2 text-center fw-bold">
            Task 3 - Fight Simulator
          </div>
        </div>
      </Link>
      <Link to="/tech-exam-1/task-4" className="d-block mx-auto text-decoration-none text-dark">
        <div className="my-2 bg-light rounded shadow-sm pb-2">
          <Image src={bem} fluid width="300px" className="rounded"/>
          <div className="mt-2 text-center fw-bold">
            Task 4 - B.E.M.
          </div>
        </div>
      </Link>
      <Link to="/tech-exam-1/task-5" className="d-block mx-auto text-decoration-none text-dark">
        <div className="my-2 bg-light rounded shadow-sm pb-2">
          <Image src={filter} fluid width="300px" className="rounded"/>
          <div className="mt-2 text-center fw-bold">
            Task 5 - Table Filter and Sort
          </div>
        </div>
      </Link>

    </div>
  </>;
}
