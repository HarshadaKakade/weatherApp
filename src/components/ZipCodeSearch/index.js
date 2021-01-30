import React, { useState } from 'react';
import { connect } from 'react-redux';
import './index.scss'
import { onChangeZipCode, onSearch } from '../../screens/Home/store/dispatcher';


const Customserach = ({
    zipCode,
    onChangeZipCode,
    onSearch,
}) => {
    const [showErrorMsg, setErrorMsg] = useState(false)
    function _onChangeZipCode() {
        if (zipCode.length !== 6 && zipCode.length !== 5) {
            setErrorMsg(true)
        } else {
            setErrorMsg(false);
            onSearch()
        }
    }
    return (
        <div className="zip-code-search">
            <div className="zip-code-search__content">
                <div>
                    <span className="zip-label">Search by Zip Code</span>
                    <input type="number" placeholder="zip code" value={zipCode} onChange={e => onChangeZipCode(e.target.value)} />
                </div>

                <div>
                    <button className="search-btn" onClick={e => _onChangeZipCode()}> Search</button>
                </div>
            </div>

            {
                showErrorMsg ? <div className="error-msg">
                    please enter the valid zip code.
                </div> : null
            }
            

        </div>
    )
}

const mapStateToProps = ({ home }) => {
    return {
        zipCode: home.zipCode
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onChangeZipCode: (zipCode) => dispatch(onChangeZipCode(zipCode)),
        onSearch: () => dispatch(onSearch())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customserach)