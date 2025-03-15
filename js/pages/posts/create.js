import { ROUTES, ENDPOINT } from "/js/config.js";
import { postRequest } from "/js/utils/api.js";

document.addEventListener('DOMContentLoaded', () => {
  const createPost = document.getElementById('create-post');
  const imageInput = document.getElementById('image');
  
  let image = null;

  if (imageInput) {
    imageInput.addEventListener('change', function(event) {
      image = event.target.files[0];
    })
  }
  if (createPost) {
    createPost.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      if(!title) {
        // 검증 코드
        return;
      }
      if(!content) {
        // 검증 코드
        return;
      }

      const postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      if (image) {
        postData.append('image', image);
      } else {
        postData.append('image', null);
      }

      console.log('게시물 생성 시도: ', { postData });
      const response = postRequest(ENDPOINT.CREATE_POST, postData, true);
      if (!response.success) {
        console.error(response.message);
        // return;
      }
      window.location.href = ROUTES.POST_LIST;
    })
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.')
  }
})