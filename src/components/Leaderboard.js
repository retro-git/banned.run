const React = require('react');
const JSON5 = require('json5')
var _ = require('lodash');
import { Run } from './Run'
import { LBTable, LBTableHead, LBTableRow, LBTableDataHead, LBTableBody } from './LeaderboardTable'

export class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        const category = this.props.categories[0];

        const subcategories = this.getSubcategories(category);

        this.state = {
            category: category,
            subcategories: subcategories,
            subcategory_selections: subcategories.map(e => e[0]),
            show_all: true,
        }
    }

    getSubcategories(selected_category) {
        const subcategories_unfiltered = this.props.runs
            .filter(r => r[this.props.columns.indexOf("category")] == selected_category)
            .map(r => r[this.props.columns.indexOf("subcategory")])
            .map(r => r.split(", "));

        let subcategories = [];

        if (subcategories_unfiltered[0] !== undefined) {
            for (var i = 0; i < subcategories_unfiltered[0].length; i++) {
                subcategories.push([...new Set(subcategories_unfiltered.map(s => s[i]))]);
            }
        }
        return subcategories;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.categories != this.props.categories) {
            const subcategories = this.getSubcategories(this.props.categories[0]);
            this.setState({
                category: this.props.categories[0],
                subcategories: subcategories,
                subcategory_selections: subcategories.map(e => e[0])
            });
        }
    }

    handleChangeCategory(e) {
        const subcategories = this.getSubcategories(e.target.value);
        this.setState({
            category: e.target.value,
            subcategories: subcategories,
            subcategory_selections: subcategories.map(e => e[0])
        })
    }

    handleChangeSubcategory(e) {
        let subcategory_selections = [...this.state.subcategory_selections];
        subcategory_selections[e.target.dataset["id"]] = e.target.value;
        this.setState({
            subcategory_selections: subcategory_selections,
        })
    }

    handleChangeShowAll(e) {
        this.setState({
            show_all: !this.state.show_all,
        })
    }

    Subcategories(props) {
        if (props.subcategories[0] == '') return;
        return (
            <div>
                <h5>Select subcategory(s):</h5>
                {props.subcategories.map((cs, i) => {
                    return (
                        <select key={i} disabled={props.value} data-id={i} onChange={props.handleChangeSubcategory} value={props.subcategory_selections[i]}>
                            {cs.map((c, i) => (
                                <option key={i} value={c}>{c}</option>
                            ))}
                        </select>
                    )
                })}
                <label>
                    <input type="checkbox" onChange={props.handleChangeShowAll} defaultChecked={props.value} />
                    Show all
                </label>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h5>Select category:</h5>
                <select onChange={this.handleChangeCategory.bind(this)} value={this.state.category}>
                    {this.props.categories.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>
                <this.Subcategories
                    subcategories={this.state.subcategories}
                    handleChangeSubcategory={this.handleChangeSubcategory.bind(this)}
                    subcategory_selections={this.state.subcategory_selections}
                    handleChangeShowAll={this.handleChangeShowAll.bind(this)}
                    value={this.state.show_all} />
                <LBTable>
                    <LBTableHead>
                        <LBTableRow>
                            {this.props.columns.map((h, i) => {
                                switch (h) {
                                    case "game":
                                        return
                                    case "category":
                                        return
                                    case "subcategory":
                                        return
                                    default:
                                        return <LBTableDataHead key={i}>{h}</LBTableDataHead>
                                }
                            })}
                        </LBTableRow>
                    </LBTableHead>
                    <LBTableBody>
                        {this.props.runs.filter((r) => r[this.props.columns.indexOf("category")] == this.state.category)
                            .filter((r) => {
                                if (this.state.show_all) return true;
                                return _.isEqual(r[this.props.columns.indexOf("subcategory")].split(", "), this.state.subcategory_selections)
                            })
                            .map((r, i) => {
                                return <Run r={r} columns={this.props.columns} i={i} key={i} />
                            })}
                    </LBTableBody>
                </LBTable>
            </div>
        )
    }
}