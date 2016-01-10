# graphql-vk-api
<a href="https://codeclimate.com/github/IamNotUrKitty/graphql-vk-api"><img src="https://codeclimate.com/github/IamNotUrKitty/graphql-vk-api/badges/gpa.svg" /></a>
<p>GraphQl schema for working with vk.com API.</p>
Still in work.

## Example
Example GraphQl query:

``` js
{
    user(user_id:"1"){
        first_name
        last_name
        friends(count:5){
            id
            domain
        }
        albums{
            title
            photos(count:3){
                photo_75
            }
        }
    }
}
```

Result will be

``` js
{
  "data": {
    "user": {
      "first_name": "Павел",
      "last_name": "Дуров",
      "friends": [
        {
          "id": "2",
          "domain": "alexandra"
        },
        {
          "id": "5",
          "domain": "ilya"
        },
        {
          "id": "6",
          "domain": "abacabadabacabaeabacabadabacaba"
        },
        {
          "id": "7",
          "domain": "id7"
        },
        {
          "id": "12",
          "domain": "id12"
        }
      ],
      "albums": [
        {
          "title": "Фотографии со страницы Павла",
          "photos": [
            {
              "photo_75": "http://cs210.vk.me/v210001/1/fxqypKXX8Bg.jpg"
            },
            {
              "photo_75": "http://cs9591.vk.me/u00001/136592355/s_2606f012.jpg"
            },
            {
              "photo_75": "http://cs9591.vk.me/u00001/136592355/s_39db64b7.jpg"
            }
          ]
        },
        {
          "title": "Фотографии на стене Павла",
          "photos": [
            {
              "photo_75": "http://cs871.vk.me/u00001/-7/s_c9984f68.jpg"
            },
            {
              "photo_75": "http://cs191.vk.me/v191001/9/7-VmiC6lKs8.jpg"
            },
            {
              "photo_75": "http://cs927.vk.me/u00001/-14/s_af1de224.jpg"
            }
          ]
        },
        {
          "title": "Сохранённые фотографии Павла",
          "photos": [
            {
              "photo_75": "http://cs403619.vk.me/v403619627/544/XDrwzthOJ9w.jpg"
            },
            {
              "photo_75": "http://cs410320.vk.me/v410320761/1bef/5A12qIFgQpI.jpg"
            },
            {
              "photo_75": "http://cs418329.vk.me/v418329279/c49/mzVlXOZIZwk.jpg"
            }
          ]
        },
        {
          "title": "Instagram",
          "photos": []
        },
        {
          "title": "Здесь будут новые фотографии для прессы-службы",
          "photos": [
            {
              "photo_75": "http://cs9591.vk.me/u00001/136592355/s_47267f71.jpg"
            },
            {
              "photo_75": "http://cs9591.vk.me/u00001/136592355/s_2606f012.jpg"
            },
            {
              "photo_75": "http://cs9591.vk.me/u00001/136592355/s_39db64b7.jpg"
            }
          ]
        }
      ]
    }
  }
}

```

## Tests

``` js
  npm test
```
