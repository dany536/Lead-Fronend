// lead list table body code

<tbody className="divide-y divide-gray-200 bg-white text-center ">
{/* <tr>
<td className="whitespace-nowrap px-4 py-4">
  <input type='text' className='form-control p-2 border' placeholder='Assign To' />
</td>

<td>
  <input type='text' className='form-control p-2 border' placeholder='Client Name' onChange={Filter} />
</td>

<td>
  <select
    name="status"
    value={leads.status}
    onChange={FilterStatus}
    id="status" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
  >
    <option value="Not Interested">Not Interested</option>
    <option value="Switched Off">Switched Off</option>
    <option value="Broker">Broker</option>
    <option value="Call Cut">Call Cut</option>
    <option value="Invalid Number">Invalid Number</option>
    <option value="In Touch">In Touch</option>
  </select>
</td>


<td className="whitespace-nowrap px-4 py-4">

</td>

<td className="whitespace-nowrap px-4 py-4 text-sm">

</td>

</tr> */}

{/* {records.filter(({ name }) => name == "Deepak").map((lead, index) => ( */}

{records.map((lead, index) => (
  <tr key={lead._id}>
    <td className="whitespace-nowrap px-4 py-4">
      <div className="text-sm font-medium text-gray-900">{index + 1}</div>
    </td>

    <td className="whitespace-nowrap px-4 py-4">
      <div className="text-sm font-medium text-gray-900">{lead.data_source}</div>
    </td>

    <td className="whitespace-nowrap px-4 py-4">
      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
    </td>

    <td className="whitespace-nowrap px-4 py-4 text-sm">
      {lead.assignedTo ? lead.assignedTo.name : 'Not Assign'}
    </td>

    <td className="whitespace-nowrap px-4 py-4">
      <div className="text-sm text-gray-900 ">{formatDate(lead.lastAssignedDate)}</div>
    </td>

    <td className="whitespace-nowrap px-4 py-4 text-sm">
      {lead.status}
    </td>

    <td className="whitespace-nowrap px-4 py-4">
      <div className="text-sm text-gray-900 ">{formatDate(lead.lastStatusUpdate)}</div>
    </td>

    <td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
      <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
        <Link to={`/leadDetails/${lead._id}`}>View</Link>
      </div>
      <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
        <Link to={`/leadUpdate/${lead._id}`}>Update</Link>
      </div>
      <div className="text-sm text-white rounded-full bg-red-600 px-4 py-1">
        <button onClick={() => deleteLead(lead._id)}>Delete</button>
      </div>
    </td>

  </tr>
))}
{/* <tr>
<td className="whitespace-nowrap px-4 py-4">
  <div className="text-sm font-medium text-gray-900">1</div>
</td>

<td className="whitespace-nowrap px-4 py-4">
  <div className="text-sm font-medium text-gray-900">Meta</div>
</td>

<td className="whitespace-nowrap px-4 py-4">
  <div className="text-sm font-medium text-gray-900">Sonu Shah</div>
</td>

<td className="whitespace-nowrap px-4 py-4 text-sm">
  <div className="text-sm font-medium text-gray-900">Kiran</div>
</td>

<td className="whitespace-nowrap px-4 py-4">
  <div className="text-sm text-gray-900 ">01/09/2024</div>
</td>

<td className="whitespace-nowrap px-4 py-4 text-sm">
  <div className="text-sm font-medium text-gray-900">No Update</div>
</td>

<td className="whitespace-nowrap px-4 py-4">
  <div className="text-sm text-gray-900 ">01/09/2024</div>
</td>

<td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
  <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
    <Link>View</Link>
  </div>
  <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
    <Link>Update</Link>
  </div>
  <div className="text-sm text-white rounded-full bg-red-600 px-4 py-1">
    <button onClick={() => deleteLead()}>Delete</button>
  </div>
</td>

</tr> */}
</tbody>