import React from 'react'
import './AccountCard.css'

function AccountCard(props) {
    return (
        <div className="accountCard col-md-3 col-sm-6 col-xs-6">
                <div className="panel panel-back noti-box">
                  <span className="icon-box bg-color-red set-icon">
                    <i className={props.cardType}></i>
                  </span>
                  <div className="text-box">
                    <p className="main-text">{props.count}</p>
                    <p className="text-muted">{props.title}</p>
                  </div>
                </div>
              </div>
    )
}

export default AccountCard
