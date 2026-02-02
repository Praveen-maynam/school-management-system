import React from 'react'

type IconButtonProps = {
  icon: React.ReactNode
  onClick: () => void
  title?: string
  variant?: 'primary' | 'danger' | 'secondary'
}

const styles = {
  primary: 'text-blue-600 hover:bg-blue-50',
  danger: 'text-red-600 hover:bg-red-50',
  secondary: 'text-gray-600 hover:bg-gray-100'
}

const IconButton = ({
  icon,
  onClick,
  title,
  variant = 'secondary'
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition ${styles[variant]}`}
    >
      {icon}
    </button>
  )
}

export default IconButton
