import postgres from 'postgres'
const sql = postgres({
  host: 'localhost',
  port: 6767,
  user: 'postgres',
  password: '',
  database: 'postgres'
})
export default defineEventHandler(async (event) => {
  const test = await sql`SELECT json_build_object(
                                        'type', 'FeatureCollection',
                                        'features', json_agg(
                                                json_build_object(
                                                        'type', 'Feature',
                                                        'properties', json_build_object(
                                                                'ogc_fid', ogc_fid,
                                                                'objectid', objectid,
                                                                'typ', typ,
                                                                'potrubie', potrubie,
                                                                'shape_length', shape_length
                                                                      ),
                                                        'geometry', ST_AsGeoJSON(wkb_geometry)::json
                                                )
                                                    )
                                ) AS geojson
                         FROM waters;`
  console.log(test)
  return test
})
