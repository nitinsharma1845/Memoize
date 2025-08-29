import React from 'react'
import {Trash2} from 'lucide-react'

const Trash = () => {
  return (
    <div className="w-full bg-amber-200 hover:bg-amber-300 duration-300 p-2 flex items-center gap-3">
      <span>
        <Trash2 />
      </span>
      <span className="text-base font-semibold">Trashed</span>
    </div>
  )
}

export default Trash