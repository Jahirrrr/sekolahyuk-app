/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getRanksOfStudent } from '../actions/generateResultAction';

const RankList = ({ testId }) => {
  const [rank, setRank] = useState([]);
  useEffect(() => {
    async function getRanks() {
      let list = await getRanksOfStudent(testId);

      if (list.length !== 0) {
        let rankList = [];
        let j = 1;
        let prev = list[0].score;
        list[0].rank = j;
        rankList.push(list[0]);

        list = list.slice(1);
        list.map(l => {
          if (prev !== l.score) {
            l.rank = ++j;
            rankList.push(l);
          } else {
            l.rank = j;
            rankList.push(l);
          }

          prev = l.score;
        });
        setRank(rankList);
      }
    }

    getRanks();
  }, []);
  return (
    <Container>
      <Table responsive hover striped bordered className="table-centered my-3">
        <thead>
          <tr>
            <th>RANK</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>SCORE OBT.</th>
          </tr>
        </thead>
        <tbody>
          {rank &&
            rank.map((r, i) => (
              <tr key={r.studentId._id}>
                <td>{r.rank}</td>
                <td>{r.studentId.name}</td>
                <td>{r.studentId.email}</td>
                <td>{r.score === -1 ? 'Not Checked' : r.score}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RankList;
