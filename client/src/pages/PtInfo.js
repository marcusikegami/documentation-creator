import { useMutation, useQuery } from "@apollo/client";
import PdfLinks from "../components/PdfLinks";
import Auth from "../utils/auth";
import { REMOVE_PDF } from "../utils/mutations";
import { QUERY_PT_PDFS } from "../utils/queries";

const PtInfo = () => {
  let { data } = useQuery(QUERY_PT_PDFS);
  let [removePdf] = useMutation(REMOVE_PDF);
  let uploads = data?.ptpdfs || [];

  const handleDeletePdf = async (url) => {
    try {
      await removePdf({
        variables: { url: url }
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    return;
  };
  return (
    <main>
      <div id='uploads-wrapper'>
        {uploads.map(upload => {
          let Url = upload.url;
          console.log(Url);
          return (

            <div key={upload.url} className='upload'>
              {Auth.loggedIn() && (
                <button onClick={() => { return handleDeletePdf(upload.url) }}>Delete File</button>
              )}
              {/* <a href={Url} download className='upload-link'>{upload.filename}</a> */}
              <a href={Url} target='__blank' download className='upload-link'>{upload.pdfname}.pdf</a>
              <p className='upload-date'>{upload.createdAt}</p>
              {/* <img src={SaveFile} alt='save file' className='save-file' /> */}
            </div>
          )
        })}
      </div>
      <PdfLinks />
    </main>
  )
};

export default PtInfo;
