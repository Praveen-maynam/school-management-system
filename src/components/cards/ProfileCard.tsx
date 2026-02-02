type ProfileCardProps = {
  name: string
  role: string
  avatar?: string
}

export const ProfileCard = ({ name, role, avatar }: ProfileCardProps) => (
  <div className="bg-white border rounded-xl p-6 flex items-center gap-4">
    <img
      src={avatar || 'https://i.pravatar.cc/100'}
      className="w-14 h-14 rounded-full"
    />
    <div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
)
