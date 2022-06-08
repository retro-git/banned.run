var React = require('react');
import { Leaderboard } from './Leaderboard'
import db from '../db.js'

const games = db.extras.exec("SELECT tbl_name from sqlite_master WHERE type = 'table'")[0]["values"];

//let unique_categories = [...new Set(res3[0]["values"].map(a => a[res3[0]["columns"].indexOf("category")]))];

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        game: games[0]
    }

    handleChange(e) {
        //console.log(e.target.value);
        this.setState({
            game: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h5>Select game:</h5>
                <select onChange={this.handleChange.bind(this)}>
                    {games.map((g) => (
                        <option value={g}>{g}</option>
                    ))}
                </select>
                <Leaderboard game={this.state.game}
                    columns={db.srcom.exec(`SELECT * FROM ${this.state.game}`)[0]["columns"]}
                    runs={db.srcom.exec(`SELECT * FROM ${this.state.game}`)[0]["values"].concat(db.extras.exec(`SELECT * FROM ${this.state.game}`)[0]["values"])}
                />
            </div>
        )
    }
}