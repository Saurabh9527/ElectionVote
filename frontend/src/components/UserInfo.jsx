
import React from 'react'
import { useSelector } from 'react-redux'

const UserInfo = () => {

  const user = useSelector((store) => store.user.userDetails)
  if(!user) return;

  function splitAddressIntoLines(address, wordsPerLine) {
    const words = address.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine));
    }
    return lines;
  }  
  
  return (
<table className="border-collapse border border-gray-400 font-medium text-gray-900">
      <tbody>
        <tr>
          <td className="border border-gray-400 px-4 py-2">Name</td>
          <td className="border border-gray-400 px-1 py-2">{user.name}</td>
        </tr>
        <tr>
          <td className="border border-gray-400 px-4 py-2">Age</td>
          <td className="border border-gray-400 px-1 py-2">{user.age}</td>
        </tr>
        <tr>
          <td className="border border-gray-400 px-4 py-2 whitespace-nowrap">Email</td>
          <td className="border border-gray-400 px-1 py-2 whitespace-nowrap">{user.email}</td>
        </tr>
        <tr>
          <td className="border border-gray-400 px-4 py-2">Mobile</td>
          <td className="border border-gray-400 px-1 py-2">{user.mobile}</td>
        </tr>
        <tr>
          <td className="border border-gray-400 px-4 py-2">Address</td>
          <td className="border border-gray-400 px-1 py-2">
          {user.address && (
      <>
        {splitAddressIntoLines(user.address , 3).map((line, index) => (
          <div key={index}>
            {line.join(' ')}
          </div>
        ))}
      </>
    )}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-400 px-4 py-2">Aadhar Number</td>
          <td className="border border-gray-400 px-1 py-2">{user.aadharCardNumber}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default UserInfo
