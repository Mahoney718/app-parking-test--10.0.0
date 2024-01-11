import "./styles.css";

import "@arco-design/web-react/dist/css/arco.css";

import React from "react";

import { useState, useEffect } from "react";

import { Button, Space } from "@arco-design/web-react";
import {
  IconPlusCircle,
  IconLocation,
  IconList,
  IconArrowLeft,
  IconDelete,
  IconEdit,
  IconSave,
} from "@arco-design/web-react/icon";

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import axios from "axios";

import { useQuery } from "react-query";

export default function App() {
  const [postId, setPostId] = React.useState(-1);

  function usePosts() {
    return useQuery("posts", async () => {
      const { data } = await axios.get("http://localhost:8000/posts/");
      return data;
    });
  }

  function Posts() {
    const { status, data, error, isFetching } = usePosts();

    return (
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div className="container-location">
              {data.map((posts) => (
                <div className="container-item" key={posts.id}>
                  <a
                    onClick={() => {

                      setPostId(posts.id);
                    }}
                    href="#"
                  >
                    <div className="wrapper-location-card" key={posts.id}>
                      <div className="location-title">
                        <h4>{posts.name}</h4>
                      </div>

                      <div className="location-name">
                        <span className="location-name-span">
                          <p>{posts.location}</p>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    );
  }

  const getPostById = async (id) => {
    const { data } = await axios.get(`http://localhost:8000/posts/${id}`);
    return data;
  };

  function usePost(postId) {
    return useQuery(["post", postId], () => getPostById(postId), {
      enabled: !!postId,
    });
  }

  function Post() {
    const { status, data, error, isFetching } = usePost(postId);

    return (
      <div className="container-post">
        <div className="wrapper-post">
          {!postId || status === "loading" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div className="wrapper-post-info">
                <>
                  {data.name == "" ? null : (
                    <>
                      <span className="wrapper-post-name">
                        <h2>{data.name}</h2>
                      </span>

                      <hr className="hr-line" />
                    </>
                  )}
                  <div className="container-info-post">
                    {data.location == "" ? null : (
                      <>
                        <span className="wrapper-post-location">
                          <h3>{data.location}</h3>
                        </span>
                      </>
                    )}
                    {data.coordinates[0] == "" ? null : (
                      <>
                        <div className="container-post-coordinates">
                          <div className="post-coordinates-content">
                            <span className="wrapper-post-coordinates">
                              {data.coordinates[0]}°
                            </span>
                            <span className="wrapper-post-coordinates">
                              {data.coordinates[1]}°
                            </span>
                          </div>
                        </div>

                        <hr className="hr-line" />
                      </>
                    )}
                    {data.maxplace == "" ? null : (
                      <>
                        <span className="wrapper-place place-m">
                          <p>Мест:</p>
                          <p className="p-w">{data.maxplace}</p>
                        </span>

                        <hr className="hr-line" />
                      </>
                    )}
                    {data.layout == "" ? null : (
                      <>
                        <span className="wrapper-post-layout">
                          <p>{data.layout}</p>
                        </span>

                        <hr className="hr-line" />
                      </>
                    )}
                    {data.belong == "" ? null : (
                      <>
                        <span className="wrapper-post-belong">
                          <p>{data.belong}</p>
                        </span>

                        <hr className="hr-line" />
                      </>
                    )}
                    {data.access == "" ? null : (
                      <>
                        <span className="wrapper-post-access">
                          <p>{data.access}</p>
                        </span>
                        <hr className="hr-line" />
                      </>
                    )}
                    {data.free == "" ? null : (
                      <>
                        <span className="wrapper-post-free">
                          <p>{data.free}</p>
                        </span>
                        <hr className="hr-line" />
                      </>
                    )}
                  </div>
                </>
              </div>
              <div>{isFetching ? "Background Updating..." : " "}</div>
            </>
          )}

          <div className="container-space">
            <div className="wrapper-space">
              <Space size="large">
                <Button
                  onClick={() => setPostId(-1)}
                  type="secondary"
                  icon={<IconArrowLeft />}
                >
                  Назад
                </Button>
                <Button
                  onClick={() => {
                    handleEdit(data.id);
                    setHidenEditPost(true);
                  }}
                  type="primary"
                  icon={<IconEdit />}
                >
                  Редактировать
                </Button>
                <Button
                  status="danger"
                  className="btn-delete"
                  onClick={() => handleDelte(data.id)}
                  type="primary"
                  icon={<IconDelete />}
                >
                  Удалить
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [hiden, setHiden] = useState(false);
  const [hidenForm, setHidenForm] = useState(false);
  const [hidenEditPost, setHidenEditPost] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [place, setPlace] = useState("");
  const [layout, setLayout] = useState("");
  const [belong, setBelong] = useState("");
  const [access, setAccess] = useState("");
  const [free, setFree] = useState("");

  const [uname, usetName] = useState("");
  const [ulocation, usetLocation] = useState("");
  const [ux, usetX] = useState("");
  const [uy, usetY] = useState("");
  const [uplace, usetPlace] = useState("");
  const [ulayout, usetLayout] = useState("");
  const [ubelong, usetBelong] = useState("");
  const [uaccess, usetAccess] = useState("");
  const [ufree, usetFree] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/posts/")
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = data.length + 1;
    await axios
      .post("http://localhost:8000/posts/", {
        id: id,
        name: name,
        location: location,
        coordinates: [x, y],
        maxplace: place,
        layout: layout,
        belong: belong,
        access: access,
        free: free,
      })
      .then((res) => {
        window.location.reload(res);
      })
      .catch((er) => console.log(er));
  };

  const handleEdit = async (id) => {
    const { data } = await axios.get(`http://localhost:8000/posts/${id}`);
    usetName(data.name);
    usetLocation(data.location);
    usetX(data.coordinates[0]);
    usetY(data.coordinates[1]);
    usetPlace(data.maxplace);
    usetLayout(data.layout);
    usetBelong(data.belong);
    usetAccess(data.access);
    usetFree(data.free);
    setPostId(id);
    return data;
  };

  const handleUpdate = async () => {
    const { data } = await axios.put("http://localhost:8000/posts/" + postId, {
      id: postId,
      name: uname,
      location: ulocation,
      coordinates: [ux, uy],
      maxplace: uplace,
      layout: ulayout,
      belong: ubelong,
      access: uaccess,
      free: ufree,
    });
    window.location.reload();
    setPostId(-1);
    return data;
  };

  const handleDelte = (id) => {
    axios
      .delete("http://localhost:8000/posts/" + id)
      .then((res) => {
        window.location.reload(res);
      })
      .catch((er) => console.log(er));
  };

  const options = [
    { value: "", text: "Доступность" },
    { value: "Бесплатные", text: "Бесплатные" },
    { value: "Платные", text: "Платные" },
    { value: "Условно бесплатные", text: "Условно бесплатные" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <main>
      <div className="container">
        {hidenForm ? (
          <div className="container-form">
            <div className="wrapper-form">
              <h1>Добавить паркинг</h1>
              <form
                id="rorm-add"
                // onSubmit={handleSubmit}
                className="wrapper-add-input"
              >
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Наименование"
                  className="arco-input arco-input-size-default"
                  id="1"
                ></input>
                <input
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Адрес"
                  className="arco-input arco-input-size-default"
                  id="2"
                ></input>
                <span className="wrapper-coordinates-input">
                  <input
                    type="text"
                    onChange={(e) => setX(e.target.value)}
                    placeholder="Координаты"
                    className="arco-input arco-input-size-default"
                    id="5"
                  ></input>
                  <input
                    type="text"
                    onChange={(e) => setY(e.target.value)}
                    placeholder="Координаты"
                    className="arco-input arco-input-size-default"
                    id="6"
                  ></input>
                </span>
                <input
                  type="number"
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Максимальное количество мест"
                  className="arco-input arco-input-size-default"
                  id="7"
                ></input>
                <select
                  id="8"
                  onChange={(e) => setLayout(e.target.value)}
                  className="arco-select arco-select-view select-custom"
                >
                  <option value={""} className="arco-select-view-input">
                    Тип расположения транспорта
                  </option>
                  <option value="Линейное">Линейное</option>
                  <option value="Площадное">Площадное</option>
                </select>
                <select
                  id="9"
                  onChange={(e) => setBelong(e.target.value)}
                  className="arco-select arco-select-view select-custom"
                >
                  <option value={""} className="arco-select-view-input">
                    Принадлежность
                  </option>
                  <option value="Муниципальное">Муниципальное</option>
                  <option value="Частное">Частное</option>
                </select>
                <div>
                  <select
                    value={selected}
                    id="10"
                    onChange={(e) => {
                      setAccess(e.target.value);
                      handleChange(e);
                    }}
                    className="arco-select arco-select-view select-custom"
                  >
                    <option
                      onClick={() => setSelected(options[0].value)}
                      value={options[0].value}
                    >
                      Доступность
                    </option>
                    <option
                      onClick={() => setSelected(options[0].value)}
                      value={options[1].value}
                    >
                      Бесплатные
                    </option>

                    <option
                      onClick={() => setSelected(options[0].value)}
                      value={options[2].value}
                    >
                      Платные
                    </option>
                    <option
                      onClick={() => setSelected(options[1].value)}
                      value={options[3].value}
                    >
                      Условно бесплатные
                    </option>
                  </select>

                  {selected == [options[3].value] ? (
                    <input
                      type="text"
                      onChange={(e) => setFree(e.target.value)}
                      placeholder="Время если условно бесплатно"
                      className="arco-input arco-input-size-default m-i"
                      id="11"
                    ></input>
                  ) : null}
                </div>
                <div className="wrapper-form-button">
                  <Button
                    onClick={() => {
                      setShow(true);
                      setHidenForm(false);
                    }}
                    type="secondary"
                    icon={<IconArrowLeft />}
                  >
                    Назад
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    type="primary"
                    icon={<IconPlusCircle />}
                  >
                    Добавить
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
        {show && (
          <div className="wrapper">
            <div className="title-list">
              <h1>Список паркинга</h1>
            </div>

            <div className="wrapper-list">
              <div>
                {postId >= 0 ? (
                  <Post postId={postId} setPostId={setPostId} />
                ) : (
                  <Posts setPostId={setPostId} />
                )}
              </div>
            </div>
            <div className="container-space">
              <div className="wrapper-space">
                <Space size="large">
                  <Button
                    onClick={() => {
                      setShow(false);
                      setHiden(true);
                    }}
                    type="secondary"
                    icon={<IconLocation />}
                  >
                    На карте
                  </Button>
                  <Button
                    onClick={() => {
                      setShow(false);
                      setHidenForm(true);
                    }}
                    type="primary"
                    icon={<IconPlusCircle />}
                  >
                    Добавить паркинг
                  </Button>
                </Space>
              </div>
            </div>
          </div>
        )}
        {hidenEditPost && (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#ffffff",
              position: "absolute",
              zIndex: 7,
              top: 0,
            }}
          >
            <div className="container-form">
              <div className="wrapper-form">
                <h1>Редактировать</h1>
                <form id="rorm-add" className="wrapper-add-input">
                  <input
                    type="text"
                    value={uname}
                    onChange={(e) => usetName(e.target.value)}
                    placeholder="Наименование"
                    className="arco-input arco-input-size-default"
                    id="13"
                  ></input>
                  <input
                    type="text"
                    value={ulocation}
                    onChange={(e) => usetLocation(e.target.value)}
                    placeholder="Адрес"
                    className="arco-input arco-input-size-default"
                    id="14"
                  ></input>
                  <span className="wrapper-coordinates-input">
                    <input
                      type="text"
                      value={ux}
                      onChange={(e) => usetX(e.target.value)}
                      placeholder="Координаты"
                      className="arco-input arco-input-size-default"
                      id="15"
                    ></input>
                    <input
                      type="text"
                      value={uy}
                      onChange={(e) => usetY(e.target.value)}
                      placeholder="Координаты"
                      className="arco-input arco-input-size-default"
                      id="16"
                    ></input>
                  </span>
                  <input
                    type="number"
                    value={uplace}
                    onChange={(e) => usetPlace(e.target.value)}
                    placeholder="Максимальное количество мест"
                    className="arco-input arco-input-size-default"
                    id="17"
                  ></input>
                  <select
                    id="18"
                    value={ulayout}
                    onChange={(e) => usetLayout(e.target.value)}
                    className="arco-select arco-select-view select-custom"
                  >
                    <option value={""} className="arco-select-view-input">
                      Тип расположения транспорта
                    </option>
                    <option value="Линейное">Линейное</option>
                    <option value="Площадное">Площадное</option>
                  </select>
                  <select
                    value={ubelong}
                    id="19"
                    onChange={(e) => usetBelong(e.target.value)}
                    className="arco-select arco-select-view select-custom"
                  >
                    <option value={""} className="arco-select-view-input">
                      Принадлежность
                    </option>
                    <option value="Муниципальное">Муниципальное</option>
                    <option value="Частное">Частное</option>
                  </select>
                  <div className="">
                    <select
                      value={uaccess}
                      id="20"
                      onChange={(e) => {
                        usetAccess(e.target.value);
                        handleChange(e);
                      }}
                      className="arco-select arco-select-view select-custom"
                    >
                      <option
                        onClick={() => setSelected(options[0].value)}
                        value={options[0].value}
                      >
                        Доступность
                      </option>
                      <option
                        onClick={() => setSelected(options[0].value)}
                        value={options[1].value}
                      >
                        Бесплатные
                      </option>

                      <option
                        onClick={() => setSelected(options[0].value)}
                        value={options[2].value}
                      >
                        Платные
                      </option>
                      <option
                        onClick={() => setSelected(options[1].value)}
                        value={options[3].value}
                      >
                        Условно бесплатные
                      </option>
                    </select>

                    <input
                      type="text"
                      value={ufree}
                      onChange={(e) => usetFree(e.target.value)}
                      placeholder="Время если условно бесплатно"
                      className="arco-input arco-input-size-default m-i"
                      id="21"
                    ></input>
                  </div>
                  <div className="wrapper-form-button">
                    <Button
                      onClick={() => {
                        setShow(true);
                        setHidenForm(false);
                        setHidenEditPost(false);
                      }}
                      type="secondary"
                      icon={<IconArrowLeft />}
                    >
                      Назад
                    </Button>

                    <Button
                      type="primary"
                      icon={<IconSave />}
                      status="success"
                      onClick={handleUpdate}
                    >
                      Сохранить
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {hiden && (
        <div className="btn-list">
          <Button
            onClick={() => {
              setShow(true);
              setHiden(false);
            }}
            type="primary"
            icon={<IconList />}
          >
            Список
          </Button>
        </div>
      )}

      <div className="ymap">
        <YMaps postId={postId} setPostId={setPostId}>
          <Map
            className="map"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100dvh",
            }}
            defaultState={{ center: [52.97076, 36.064349], zoom: 15 }}
          >
            {data.map((posts, index) => (
              <Placemark
                key={index}
                geometry={posts.coordinates}
                options={{
                  iconLayout: "default#image",
                  iconImageHref:
                    "https://cdn-eu.icons8.com/OzUZLWwl50aEeSRgJ8NX3w/6Qx4giAKQEaNJkZ5zB2RFQ/Frame.png",
                  iconImageSize: [32, 32],
                }}
              />
            ))}
          </Map>
        </YMaps>
      </div>
    </main>
  );
}
