var React = require('react');
import styled, { css, createGlobalStyle } from 'styled-components'

const LegendSpan = styled.div`
    margin: 0em 0.2em;
    padding: 0.2em;
    border-radius: 0.5em;
`;

export class Legend extends React.Component {
    render() {
        return (
            <LegendSpan style={{ backgroundColor: this.props.l ? this.props.l["colour"] : "grey" }}>
                {!this.props.l ? (this.props.name ? this.props.name : _.startCase(this.props.type + " unknown")) : "text" in this.props.l ? this.props.l.text : this.props.name}
                <label>
                    <input type="checkbox" data-name={this.props.name} data-type={this.props.type} onChange={this.props.handleChangeFilter} checked={this.props.checked} />
                </label>
            </LegendSpan>
        );
    }
}