import React from 'react';

const TeamMember = ({ name, role, bio, url }) => {
  const styles = { backgroundImage: 'url(' + url + ')' };
  return (
    <div className="ab-team__member">
      <div className="ab-team__member--inner">
        <div className="ab-team__member__img" style={styles}>
        </div>
        <div className="ab-team__member__info">
          <h4 className="ab-team__member__name">
            { name }
          </h4>
          <h4 className="ab-team__member__role">
            { role }
          </h4>
          <p className="ab-team__member__bio">
            { bio }
          </p>
        </div>
      </div>
    </div>
  )
}

export default TeamMember;
