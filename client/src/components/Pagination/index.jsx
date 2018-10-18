import React from 'react'

const Pagination = ({total, active}) => {
  const pages = [1, 1, 1, 1, 1, 1];
  // pages.length = 69;
  return (
    <div>
      <ul class="pagination">
        <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
        {pages.map((item, i) => (
          <li className={active == i + 1 ? "active" : "waves-effect"}>
            <a href="#!">{i + 1}</a>
          </li>
        ))}
        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
      </ul>
    </div>
  )
}
export default Pagination;